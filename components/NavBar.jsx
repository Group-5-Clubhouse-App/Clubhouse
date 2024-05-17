import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckToken from './CheckToken';

const NavBar = ({token}) => {
  const navigation = useNavigation();
  console.log(token)

  if (token) {
    return (
      <View style={navStyles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={navStyles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Post')}>
          <Text style={navStyles.navText}>Create Post</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Text style={navStyles.navText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={navStyles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return null;
  }
}

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
