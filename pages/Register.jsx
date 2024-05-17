import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Register = ({setToken}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();


  const handleRegister = async () => {
    // Add register logic here
    if (!username || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('https://clubhouse-6uml.onrender.com/auth/register', {
        username,
        password,
    });

    const token = response.data.token;
    const user = response.data.user;

    console.log('token', token);
    console.log('user', user);

    await AsyncStorage.setItem('token', token);
    setToken(token)

    Alert.alert('Registration successful!');
    navigation.navigate('Home');
    } catch (error) {
      console.error(error);
        Alert.alert('Registration failed!')
    }
  };


  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Register Page</Text>
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
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry
        style={{ marginBottom: 8, padding: 8, borderColor: 'gray', borderWidth: 1 }}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};


export default Register;