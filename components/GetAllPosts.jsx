import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image, RefreshControl, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const GetAllPosts = ({ onRefresh, token, setToken, otherUserid, setOtherUserid }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);

  const navigation = useNavigation();

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://clubhouse-6uml.onrender.com/api/posts');
      if (!response.ok) {
        throw new Error('Network response was not okay');
      }
      const data = await response.json();
      const sortedPosts = data.sort((a, b) => new Date(b.time_posted) - new Date(a.time_posted));
      setPosts(sortedPosts);

    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleLike = async (postId, userId) => {
    parseInt(postId);
    try {
      const response = await axios.post(`https://clubhouse-6uml.onrender.com/api/posts/${postId}/like`, {
        userId
      });
      const data = response.data;
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId ? { ...post, like_count: data.like_count, liked_by: data.liked_by } : post
        )
      );

      // setLikedPosts(prevLikedPosts =>
      //   prevLikedPosts.includes(postId) ? prevLikedPosts.filter(id => id !== postId) : [...prevLikedPosts, postId]
      // );
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [handleLike]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  const handleVisitProfile = (userId) => {
    setOtherUserid(userId);

    if (userId) {
      navigation.navigate('User Profile', { userid: userId });
    } else {
      console.log('User ID is not available');
    }
  };

  useEffect(() => {
    if (onRefresh) {
      onRefresh(handleRefresh);
    }
  }, [onRefresh]);


  if (loading) {
    return <ActivityIndicator size={'large'} color='#OOOOff' />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }


  return (
    <ScrollView
      style={styles.flatListContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      {posts.map((item) => (
        <View key={item.id.toString()} style={styles.post}>
          <View style={styles.userInfo}>
            <Image
              source={
                typeof item.user.profile_icon === 'string' && item.user.profile_icon.startsWith('http')
                  ? { uri: item.user.profile_icon }
                  : require('../imgs/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg')
              }
              style={styles.profileIcon}
            />
            <TouchableOpacity onPress={() => handleVisitProfile(item.user.id)}>
              <Text style={styles.username}>{item.user.username}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>{item.description}</Text>
          <Text>{new Date(item.time_posted).toLocaleString()}</Text>
          <View style={styles.likeContainer}>
            <Button
              title={`Like (${item.like_count})`}
              onPress={() => handleLike(item.id, item.user.id)}
            // Change color if liked
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  flatListContainer: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  post: {
    marginBottom: 1,
    padding: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'slategrey',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  likeContainer: {
    marginTop: 10,
  },
});

export default GetAllPosts;