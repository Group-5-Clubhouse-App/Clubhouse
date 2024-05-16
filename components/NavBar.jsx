import React from 'react';
import { StyleSheet } from 'react-native-web';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NavBar = () => {
  const navigation = useNavigation();
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };
  const navigateToLogin = (screenName) => {
    navigation.replace(screenName);
  };


  return (
    <View style={ navStyles.navBar }>
      <TouchableOpacity onPress={() => navigateToScreen('Home')}>
        <Text style={navStyles.navText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Post')}>
        <Text style={navStyles.navText}>Create Post</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Notifications')}>
        <Text style={navStyles.navText}>Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Profile')}>
        <Text style={navStyles.navText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const navStyles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 30,
    backgroundColor: '#323232',
    borderWidth: 1,
    borderColor: 'white',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
  },
  navText: {
    color: 'white',
  },
});

export default NavBar;
