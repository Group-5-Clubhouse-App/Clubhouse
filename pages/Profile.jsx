import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckToken from '../components/CheckToken';
import Logout from '../components/Logout';

const Profile = ({token, setToken}) => {
  const navigation = useNavigation();
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  }
  return (
    <View>
      <CheckToken token={token} setToken={setToken}/>
      <Text style={{textAlign: 'right'}}>This is where the rest of the profile page will be
      <Text> <Logout token={token} setToken={setToken}/> </Text>
        <TouchableOpacity onPress={() => navigateToScreen('Settings')} style={settingsButton.button}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Settings</Text>
        </TouchableOpacity>
      </Text>
      {/* this is where a get user details component would go so that we can display the users profile pic, bio, and posts. This componenet will have its own styling that will accompany the profile page */}
    </View>
  );
};

const settingsButton = StyleSheet.create ({
  button:{
    padding: 10,
    backgroundColor: 'slategrey',
    color: 'white',
    borderRadius: 10,
    borderWidth: 1
  }
})

export default Profile;