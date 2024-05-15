import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GetAllNotificationPosts = () => {
  return (
    <View>
      <Text style={styles.container}>This is where all the notification posts for this user will go</Text>
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

export default GetAllNotificationPosts;