import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckToken from '../components/CheckToken';
import GetAllUserPosts from '../components/GetUserPost';
import UserInfo from '../components/UserInfo';

const Profile = ({token, setToken}) => {
  const navigation = useNavigation();
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  }
  return (
    <View>
      <CheckToken token={token} setToken={setToken}/>
      <View>
        <UserInfo token={token}/>
      </View>
      <GetAllUserPosts token={token}/>
    </View>
  );
};

const settingsButton = StyleSheet.create ({
  button:{
    padding: 10,
    backgroundColor: 'slategrey',
    color: 'white',
    borderRadius: 10,
    borderWidth: 1,
    width: 80.2, 
    marginLeft: 328
  }
})

export default Profile;