import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GetAllPosts from '../components/GetAllPosts';

const Home = () => {
  return (
    <View>
      <Text style={{textAlign: `center`, fontWeight: 'bold', marginBottom: 10}}>Welcome to Home Page!</Text>
      <GetAllPosts />
    </View>
  );
};

export default Home;