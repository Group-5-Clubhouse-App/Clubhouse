import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import GetAllNotificationPosts from '../components/GetAllNotificationPosts';

const Notifications = () => {
  return (
    <ScrollView>
    <View>
      <GetAllNotificationPosts />
    </View>
    </ScrollView>
  );
};

export default Notifications;