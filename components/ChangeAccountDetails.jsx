import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const ChangeAccountDetails = ({token}) => {
  const [usernameText, setUsernameText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [bioText, setBioText] = useState('');
  const [profileIconURLText, setProfileIconURLText] = useState('');

  const navigation = useNavigation();
  const navigateToScreen = (screenName) => {
    navigation.replace(screenName);
  };

  const handleEditAccount = async () => {
    const decodedToken = jwtDecode(token);
    const userid = decodedToken.userId
    try {
      const response = await axios.put(`https://clubhouse-6uml.onrender.com/api/users/${userid}`, {
        username: usernameText,
        password: passwordText,
        bio: bioText,
        profile_icon: profileIconURLText
      });

      Alert.alert('Account edit successful');
      navigateToScreen('Home');
    } catch (error) {
      console.error(error);
      Alert.alert('Account edit not successful', error.response);
    }
  };
  const handleDeleteAccount = async () => {
    // Add post logic here once post routes are made
    try {
      await axios.delete('http://localhost:8080/auth/delete', {
        headers: { Authorization: `Bearer ${token}` },
      });
      Alert.alert('Account deleted successfully');

      navigateToScreen('Login');
    } catch(error) {
      console.error('Error deleting account:', error);
      Alert.alert(
        'Account deletion not successful',
        error.respons?.data?.message || error.message
      );
    }
  };

  return (
    <>
    <View style={settingsStyles.postCard}>
      <Text style={{fontWeight: '400', fontSize: 18}}>Change Account Details</Text>
      <TextInput
        placeholder="Username"
        value={usernameText}
        onChangeText={(text) => setUsernameText(text)}
        style={settingsStyles.border}
        multiline={true}
      />

      <TextInput
        placeholder="Password"
        value={passwordText}
        onChangeText={(text) => setPasswordText(text)}
        style={settingsStyles.border}
        multiline={true}
      />

      <TextInput
        placeholder="Bio"
        value={bioText}
        onChangeText={(text) => setBioText(text)}
        style={[settingsStyles.border, settingsStyles.bio]}
        multiline={true}
        numberOfLines={10}
      />
           
      <TextInput
        placeholder="Profile Icon URL"
        value={profileIconURLText}
        onChangeText={(text) => setProfileIconURLText(text)}
        style={[settingsStyles.border, settingsStyles.bio]}
        multiline={true}
      />

      <Button title="Edit Account Details" onPress={handleEditAccount} />
    </View>
    <View style={settingsStyles.deleteAccount}>
      <Button title="Delete Account?" onPress={handleDeleteAccount} color={'red'}/>
    </View>
    </>
  );
};

const settingsStyles = StyleSheet.create({
  postCard: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#E8E8E8',
    borderWidth: 1,
    borderColor: 'slategrey',
    borderRadius: 10
  },
  border: {
    color: 'black',
    borderWidth: 1,
    borderColor: 'slategrey',
    borderRadius: 5,
    height: 35,
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 10,
    fontSize: 18
  },
  bio: {
    height: 150
  },
  deleteAccount: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'lightgrey',
    borderWidth: 1,
    borderColor: 'slategrey',
    borderRadius: 10
  },
});

export default ChangeAccountDetails;