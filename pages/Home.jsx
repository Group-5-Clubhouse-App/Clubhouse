import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import GetAllPosts from '../components/GetAllPosts';
import CheckToken from '../components/CheckToken';

const Home = () => {
  return (
    <ScrollView>
      <CheckToken/>
    <View>
      <Text style={{textAlign: `center`, fontWeight: 'bold', marginBottom: 10}}>Welcome to Home Page!</Text>
      <GetAllPosts />
    </View>
    </ScrollView>
  );
};

export default Home;