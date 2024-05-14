import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const Post = () => {
  const [postText, setPostText] = useState('');

  const handlePost = async () => {
    // Add post logic here
  };

  return (
    <View>
      <Text>Post Page</Text>
      <TextInput
        placeholder="Write a post..."
        value={postText}
        onChangeText={(text) => setPostText(text)}
      />
      <Button title="Post" onPress={handlePost} />
    </View>
  );
};

export default Post;