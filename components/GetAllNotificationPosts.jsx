import { StyleSheet, Alert, View, Text } from 'react-native';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useEffect } from 'react';

const GetAllNotificationPosts = ({token}) => {
  const decodedToken = jwtDecode(token);
  const userid = decodedToken.userId
  console.log(userid)
  useEffect(() => {
    const getUserNotifications = async () => {
      try {
        console.log(`We got here at least`);
        const response = await axios.get(`https://clubhouse-6uml.onrender.com/api/notifs/${userid}`);
        
        console.log(response.data);
      } catch (error) {
        console.error(error);
        Alert.alert('Error getting notifications', error.response);
      }
    };
    getUserNotifications();
  }, [userid]);
  
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