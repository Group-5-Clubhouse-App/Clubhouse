import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image } from 'react-native';
import {jwtDecode} from 'jwt-decode';

const GetAllUserPosts = ({token}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserPosts = async () => {
      console.log(`we got here`)
      const decodedToken = jwtDecode(token)
      const userid = decodedToken.userId
      console.log(userid)
      console.log(token)
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
        console.log(response)
        if (!response.ok) {
          throw new Error('Network response was not okay');
        }

        const data = await response.json();
        console.log(data)
        console.log(data)
        setPosts(data)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

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
    <View style={styles.flatListContainer}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <View style={styles.userInfo}>
              <Image source={{ uri: item.user.profile_icon }} style={styles.profileIcon} />
              <Text style={styles.username}>{item.user.username}</Text>
            </View>
            <Text style={styles.title}>{item.description}</Text>
            <Text>{new Date(item.time_posted).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
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
    marginBottom: 20,
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
    borderRadius: 2
    },
  });

export default GetAllUserPosts;