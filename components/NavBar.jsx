import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, View } from 'react-native';

const NavBar = () => {
  const navigation = useNavigation();
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 16 }}>
      <TouchableOpacity onPress={() => navigateToScreen('Home')}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Post')}>
        <Text>Create Post</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Notifications')}>
        <Text>Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Profile')}>
        <Text>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Login')}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavBar;
