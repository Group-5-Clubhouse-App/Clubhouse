import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image, RefreshControl, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const GetMessages = ({ dmId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchMessages = async () => {
    try {
      const response = await fetch(`https://clubhouse-6uml.onrender.com/api/dm/${dmId}/messages`);
      if (!response.ok) {
        throw new Error('Network response was not okay');
      }
      const data = await response.json();
      setMessages(data);

    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMessages();
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
    <ScrollView style={styles.flatListContainer}>
      {messages.map((message) => (
        <View key={message.id.toString()} style={styles.post}>
          <View style={styles.userInfo}>
            <Image
              source={
                typeof message.user.profile_icon === 'string' && message.user.profile_icon.startsWith('http')
                  ? { uri: message.user.profile_icon }
                  : require('../imgs/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg')
              }
              style={styles.profileIcon}
            />
              <Text style={styles.username}>{message.user.username}</Text>
              </View>
          <Text style={styles.title}>{message.content}</Text>
          <Text>{new Date(message.time_sent).toLocaleString()}</Text>
        </View>
      ))}
    </ScrollView>
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
    marginBottom: 1,
    padding: 10,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'slategrey',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  profileIcon: {
    width: 26,
    height: 26,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  likeContainer: {
    marginTop: 10,
  },
});

export default GetMessages;