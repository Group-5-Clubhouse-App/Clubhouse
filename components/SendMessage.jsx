import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import { Button, View, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native';

export const SendMessage = ({ dmId, token, onMessageSent }) => {
  const [content, setContent] = useState('');
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.userId;

  const makeMessage = async () => {
    try {
      const response = await axios.post(`https://clubhouse-6uml.onrender.com/api/dm/${dmId}/messages`, 
        { 
          userid: userId,
          content
        }
      );
      setContent('');
      onMessageSent();
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Send Message..."
        value={content}
        onChangeText={(text) => setContent(text)}
        style={styles.border}
        multiline={true}
      />
      <Button title="Send" onPress={makeMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
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
  keyboard: {
    paddingBottom: 50
  }
});
