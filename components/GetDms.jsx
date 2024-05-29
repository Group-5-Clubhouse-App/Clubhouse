import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const GetDms = ({ token, setDmId }) => {
  const [dms, setDms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigation();

  const handleNavigateToChat = (dmId) => {
    setDmId(dmId)
    navigate.navigate('Chat', { dmId })
  }

  useEffect(() => {
    const fetchUserDms = async () => {
      if (!token) {
        setError(new Error('No token found'));
        setLoading(false);
        return;
      }

      const decodedToken = jwtDecode(token);
      const userid = decodedToken.userId;
      try {
        const response = await axios.get(`https://clubhouse-6uml.onrender.com/api/dm/${userid}`);
        const data = response.data;
        setDms(data);
      } catch (error) {
        console.error('Error fetching DMs:', error);
        console.log(error)
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDms();
  }, [token, navigate]);

  if (loading) {
    return (
      <View>
        <Text style={{ textAlign: 'center', marginTop: 170, fontWeight: 'bold', fontSize: 30 }}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text style={{ textAlign: 'center', marginTop: 170, fontWeight: 'bold', fontSize: 30 }}>Error: {error.message}</Text>
      </View>
    );
  }

  if (dms.length === 0) {
    return (
      <View>
        <Text style={{ textAlign: 'center', marginTop: 170, fontWeight: 'bold', fontSize: 30 }}>No DMs yet!</Text>
        <Text style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 20, fontSize: 30 }}>Try making some by searching for a user above!</Text>
      </View>
    );
  }
  return (
    <View style={{ paddingBottom: 480 }}>
      <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginVertical: 10 }}>Here are your current DMs!</Text>
      <ScrollView>
        {dms.map((dm, index) => (
          <TouchableOpacity onPress={() => handleNavigateToChat(dm.id)}>
          <View key={index} style={styles.container}>
            <View style={styles.userInfo}>
              <Image
                source={
                  typeof dm.users[0].profile_icon === 'string' && dm.users[0].profile_icon.startsWith('http')
                    ? { uri: dm.users[0].profile_icon }
                    : require('../imgs/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg')
                }
                style={styles.profileIcon}
              />
              <Text style={styles.username}>{dm.users[0].username}</Text>
            </View>
          </View>
          </TouchableOpacity>
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
    borderColor: 'slategrey',
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: 60,
    height: 60,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
  },
  username: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default GetDms;
