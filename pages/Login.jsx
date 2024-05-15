import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios'; // Add axios for making API requests
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Add error state to display errors
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        username,
        password,
      });

      //console.log(response)
  
      const token = response.data.token
      const user = response.data.user

      console.log('token', token);
      console.log('user', user);
  
      await AsyncStorage.setItem('token', token);
      // Store the token in the local storage or in a state variable
      // and navigate to the home screen or perform any other action
      Alert.alert('Login successful');
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
      Alert.alert('Login failed', error.response);
    }
  };


  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Login Page</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={{ marginBottom: 8, padding: 8, borderColor: 'gray', borderWidth: 1 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={{ marginBottom: 8, padding: 8, borderColor: 'gray', borderWidth: 1 }}
      />
      {error && <Text style={{ color: 'red', marginBottom: 8 }}>{error}</Text>}
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default Login;