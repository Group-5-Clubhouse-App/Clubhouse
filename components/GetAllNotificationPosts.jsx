import { StyleSheet, Alert, View, Text } from 'react-native';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

const GetAllNotificationPosts = ({token}) => {
  const [posts, setPosts] = useState([]);
  const decodedToken = jwtDecode(token);
  const userid = decodedToken.userId
  useEffect(() => {
    const getUserNotifications = async () => {
      try {
        const response = await axios.get(`https://clubhouse-6uml.onrender.com/api/notifs/${userid}`);
        setPosts(response.data)
      } catch (error) {
        console.error(error);
        Alert.alert('Error getting notifications', error.response);
      }
    };
    getUserNotifications();
  }, [userid]);

  if (posts.length === 0) {
    return <Text style={{textAlign: 'center', marginVertical: 300, fontWeight: 'bold', fontSize: 30}}>No notifications yet!</Text>
  }

  console.log(`here are post details`, posts);

  return (
    <View>
      <Text style={styles.container}>This is where all the notification posts for this user will go</Text>
      <ScrollView>
      {posts.map((post, index) => (
        <View key={index} style={styles.container}>
          <Text>{post.userid}</Text>
          <Text style={{fontWeight: 'bold', fontSize: 16, marginVertical: 4}}>{post.description}</Text>
          <Text style={{fontSize: 10}}>{post.time_posted}</Text>
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

export default GetAllNotificationPosts;