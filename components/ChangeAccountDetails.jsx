import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Post = () => {
  const [usernameText, setUsernameText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [bioText, setBioText] = useState('');

  const handleEditAccount = async () => {
    // Add post logic here once post routes are made
  };
  const handleDeleteAccount = async () => {
    // Add post logic here once post routes are made
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

export default Post;