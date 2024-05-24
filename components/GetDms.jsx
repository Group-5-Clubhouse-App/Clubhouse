import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { jwtDecode } from 'jwt-decode';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

const GetDms = ({token}) => {
    const [dms, setDms] = useState([]);
  
    useEffect(() => {
      const fetchUserDms= async () => {
        const decodedToken = jwtDecode(token);
        const userid = decodedToken.userId;
        if (!token) {
          setError(new Error('No token found'));
          setLoading(false);
          return;
        }
        try {
          const response = await axios.get(`https://clubhouse-6uml.onrender.com/api/dm${userid}`);
          const data = await response.json();
          console.log(data)
          setDms(data);
          console.log(dms)
        } catch (error) {
          throw error;
        }
      };
  
      fetchUserDms();
    }, [setDms]);
  
    if (dms.length === 0) {
      return (<View>
        <Text style={{textAlign: 'center', marginTop: 170, fontWeight: 'bold', fontSize: 30}}>No dms yet!</Text>
        <Text style={{textAlign: 'center', fontWeight: 'bold', marginTop: 20,fontSize: 30}}>Try making some by searching for a user above!</Text>
      </View>)
    }
  
    return (
      <View style={{paddingBottom: 480}}>
        <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginVertical: 10}}>Here are your dms!</Text>
        <ScrollView>
        {dms.map((dm, index) => (
          <View key={index} style={styles.container}>
              <View style={styles.userInfo}>
              <Image source={
               typeof dm.user.profile_icon === 'string' && dm.user.profile_icon.startsWith('http')
               ? { uri: dm.user.profile_icon }
               : require('../imgs/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg')
               } style={styles.profileIcon} />
              <Text style={styles.username}>{dm.user.username}</Text>
            </View>
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
      borderColor: 'slategrey',
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

export default GetDms;