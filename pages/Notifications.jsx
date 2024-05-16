import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import GetAllNotificationPosts from '../components/GetAllNotificationPosts';
import CheckToken from '../components/CheckToken';

const Notifications = () => {
  return (
    <ScrollView>
      <CheckToken />
    <View>
      <GetAllNotificationPosts />
    </View>
    </ScrollView>
  );
};

export default Notifications;