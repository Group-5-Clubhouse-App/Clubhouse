import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logout = ({setToken}) => {
  const navigation = useNavigation();
  const navigateToLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };
return(
<View>
<Button title="Logout" onPress={async () => {
  try {
    await AsyncStorage.setItem('token', '');
    const newBlankToken = await AsyncStorage.getItem('token');
    setToken(newBlankToken);
    navigateToLogin();
  } catch (error) {
    console.error('Error:', error);
  }
  }}>;
</Button>
</View>
)};

export default Logout;