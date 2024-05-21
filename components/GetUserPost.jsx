import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { jwtDecode } from 'jwt-decode';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';


const GetAllUserPosts = ({ token }) => {
  const [posts, setPosts] = useState([]);

  const handleDeletePost = async ({token, postid}) => {
    console.log(`test`);
    console.log(token);
    console.log(postid);
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
        setPosts(data);
      } catch (error) {
        throw error;
      }
    };

    fetchUserPosts();
  }, [handleDeletePost]);

  if (posts.length === 0) {
    return <Text>No posts yet!</Text>
  }

  return (
    <View>
      <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginVertical: 10}}>Here are your posts!</Text>
      <ScrollView>
      {posts.map((post, index) => (
        <View key={index} style={styles.container}>
          <Text>{post.userid}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginVertical: 4 }}>{post.description}</Text>
          <Text style={{ fontSize: 10 }}>{post.time_posted}</Text>
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
    borderColor: 'slategrey'
  },
});
export default GetAllUserPosts;
