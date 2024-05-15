import { StyleSheet, View } from 'react-native';
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
  <NavigationContainer screenOptions={{backgroundColor: 'transparent'}}>
   <Stack.Navigator
   screenOptions={{
    headerStyle: {
      backgroundColor: '#272727'
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
   }}>
      <Stack.Screen name="Home" component={Home} options={{cardStyle: styles.containerForScreens}}/>
      <Stack.Screen name="Settings" component={Settings} options={{cardStyle: styles.containerForScreens}}/>
      <Stack.Screen name="Login" component={Login} options={{cardStyle: styles.containerForScreens}}/>
      <Stack.Screen name="Notifications" component={Notifications} options={{cardStyle: styles.containerForScreens}}/>
      <Stack.Screen name="Post" component={Post} options={{cardStyle: styles.containerForScreens}}/>
      <Stack.Screen name="Profile" component={Profile} options={{cardStyle: styles.containerForScreens}}/>
      <Stack.Screen name="Register" component={Register} options={{cardStyle: styles.containerForScreens}}/>
    </Stack.Navigator>
    <NavBar />
  </NavigationContainer>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272727',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingBottom: 40
  },
  containerForScreens: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 10,
  },
});

export default App;
