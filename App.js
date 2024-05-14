import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Navbar from './Navbar';
import { Home, Login, Notifications, Post, Profile, Register, Settings } from './pages';

const Stack = createStackNavigator();

const App = () => {
  return (

    <View style={styles.container}>
      <Text>Welcome to the Clubhouse!</Text>
      <StatusBar style="auto" />
      <NavigationContainer>
   <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Post" component={Post} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
    <Navbar />
  </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
