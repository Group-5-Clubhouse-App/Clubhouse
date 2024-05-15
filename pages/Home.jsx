import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import GetAllPosts from '../components/GetAllPosts';

const Home = () => {
  return (
    <ScrollView>
    <View>
      <Text style={{textAlign: `center`, fontWeight: 'bold', marginBottom: 10}}>Welcome to Home Page!</Text>
      <GetAllPosts />
    </View>
    </ScrollView>
  );
};

export default Home;