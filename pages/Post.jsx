import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import CheckToken from '../components/CheckToken';
import { createPost } from '../components/CreatePost';

const Post = ({token, setToken}) => {
  const [postText, setPostText] = useState('');

  const handlePost = async () => {
    // Add post logic here once post routes are made
    if (!postText.trim()) {
      Alert.alert('Error', 'Post description is required');
      return;
    }
    try {
      const newPost = await createPost(postText, token);
      Alert.alert('Success', 'Post created successfully');
      setPostText('');
    } catch (error) {
      Alert.alert('Error', 'Failed to create post');
    }
  };

  return (
    <View style={postStyles.postCard}>
      <CheckToken token={token} setToken={setToken}/>
      <Text style={{fontWeight: '600', fontSize: 20}}>Create a post</Text>
      <TextInput
        placeholder="Write a post..."
        value={postText}
        onChangeText={(text) => setPostText(text)}
        style={postStyles.border}
        multiline={true}
        numberOfLines={10}
      />
      <Button title="Create Post" onPress={handlePost} />
    </View>
  );
};

const postStyles = StyleSheet.create({
  postCard: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
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
    height: 200,
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 10,
    fontSize: 18
  },
});

export default Post;