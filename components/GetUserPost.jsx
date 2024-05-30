import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { jwtDecode } from 'jwt-decode';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';


const GetAllUserPosts = ({ token }) => {
  const [posts, setPosts] = useState([]);

  const handleDeletePost = async ({token, postid}) => {
    console.log(postid)
    try {
      const response = await axios.delete(`https://clubhouse-6uml.onrender.com/api/post/${postid}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchUserPosts = async () => {
      const decodedToken = jwtDecode(token);
      const userid = decodedToken.userId;
      if (!token) {
        setError(new Error('No token found'));
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`https://clubhouse-6uml.onrender.com/api/posts/user/${userid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        const sortedPosts = data.sort((a, b) => new Date(b.time_posted) - new Date(a.time_posted));
        setPosts(sortedPosts);
      } catch (error) {
        throw error;
      }
    };

    fetchUserPosts();
  }, [handleDeletePost]);

  if (posts.length === 0) {
    return (<View>
      <Text style={{textAlign: 'center', marginTop: 220, fontWeight: 'bold', fontSize: 30}}>No posts yet!</Text>
      <Text style={{textAlign: 'center', fontWeight: 'bold', marginTop: 20,fontSize: 30}}>Try making some by hitting "Create Post" below!</Text>
    </View>)
  }

  return (
    <View style={{paddingBottom: 480}}>
      <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginVertical: 10}}>Here are your posts!</Text>
      <ScrollView>
      {posts.map((post, index) => (
        <View key={index} style={styles.container}>
            <View style={styles.userInfo}>
            <Image source={
             typeof post.user.profile_icon === 'string' && post.user.profile_icon.startsWith('http')
             ? { uri: post.user.profile_icon }
             : require('../imgs/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg')
             } style={styles.profileIcon} />
            <Text style={styles.username}>{post.user.username}</Text>
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginVertical: 4 }}>{post.description}</Text>
          <Text style={{ fontSize: 10 }}>{new Date(post.time_posted).toLocaleString()}</Text>
          <Button onPress={() => handleDeletePost({ token, postid: post.id })} title="Delete Post"></Button>
        </View>
      ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
});
export default GetAllUserPosts;
