import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image} from 'react-native';
import { SendMessage } from './SendMessage';

const GetMessages = ({ dmId, token }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messageSent, setMessageSent] = useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://clubhouse-6uml.onrender.com/api/dm/${dmId}/messages`);
      if (!response.ok) {
        throw new Error('Network response was not okay');
      }
      const data = await response.json();
      setMessages(data);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [messageSent]);

  const handleRefresh = () => {
    setMessageSent(prev => !prev);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  if (messages.length === 0) {
    return (
      <View>
        <Text>No messages yet</Text>
        <SendMessage dmId={dmId} token={token} onMessageSent={handleRefresh} />
      </View>
    );
  }

  return (
    <View>
      <ScrollView contentContainerStyle={{flexGrow: 1 }} style={styles.flatListContainer}>
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
      <SendMessage dmId={dmId} token={token} onMessageSent={handleRefresh} />
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
    flexGrow: 1,
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
    borderWidth: 1,
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
  keyboard: {
    paddingBottom: 50
  }
});

export default GetMessages;
