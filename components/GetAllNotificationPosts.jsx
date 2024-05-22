import { StyleSheet, Alert, View, Text, Image, TouchableOpacity } from 'react-native';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const GetAllNotificationPosts = ({token, otherUserid, setOtherUserid}) => {
  const [posts, setPosts] = useState([]);
  const decodedToken = jwtDecode(token);
  const userid = decodedToken.userId
  const navigation = useNavigation();
  useEffect(() => {
    const getUserNotifications = async () => {
      try {
        const response = await axios.get(`https://clubhouse-6uml.onrender.com/api/notifs/${userid}`);
        const sortedPosts = response.data.sort((a, b) => new Date(b.time_posted) - new Date(a.time_posted));
        setPosts(sortedPosts)
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
  const handleVisitProfile = (userId) => {
    setOtherUserid(userId);

    if (userId) {
      navigation.navigate('User Profile', { userid: userId });
    } else {
      console.log('User ID is not available');
    }
  };

  return (
    <View>
      <ScrollView>
      {posts.map((post, index) => (
        <View key={index} style={styles.container}>
          <View style={styles.userInfo}>
            <Image source={
             typeof post.user.profile_icon === 'string' && post.user.profile_icon.startsWith('http')
             ? { uri: post.user.profile_icon }
             : require('../imgs/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg')
             } style={styles.profileIcon} />
            <TouchableOpacity
              onPress={() => handleVisitProfile(post.user.id)}
              >
              <Text style={styles.username}>{post.user.username}</Text>
              </TouchableOpacity>
          </View>
          <Text style={{fontWeight: 'bold', fontSize: 16, marginVertical: 4}}>{post.description}</Text>
          <Text style={{fontSize: 10}}>{new Date(post.time_posted).toLocaleString()};</Text>
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
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1
  },
});

export default GetAllNotificationPosts;