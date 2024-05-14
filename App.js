import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Notifications from './pages/Notifications';
import Post from './pages/Post';
import Profile from './pages/Profile';
import Register from './pages/Register';


const Stack = createStackNavigator();
const App = () => {
  return (

  <View style={styles.container}>
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
    <NavBar />
  </NavigationContainer>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 20
  },
});

export default App;
