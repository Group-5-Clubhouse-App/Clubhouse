import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import GetAllPosts from '../components/GetAllPosts';
import CheckToken from '../components/CheckToken';

const Home = ({ token, setToken }) => {
  const refreshPostsRef = useRef(null);

  const handleRefreshButtonPress = () => {
    if (refreshPostsRef.current) {
      refreshPostsRef.current();
    }
  };

  return (
    <ScrollView>
      <CheckToken token={token} setToken={setToken} />
      <View>
        <Text style={styles.welcomeText}>Welcome to Home Page!</Text>
        <Button title="Refresh Posts" onPress={handleRefreshButtonPress} />
        <GetAllPosts onRefresh={(refreshFunction) => (refreshPostsRef.current = refreshFunction)} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Home;