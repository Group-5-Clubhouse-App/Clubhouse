import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NavBar = ({token}) => {
  const navigation = useNavigation();

  if (token) {
    return (
      <View style={navStyles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Direct Messages')}>
          <Text style={navStyles.navText}>DM's</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Post')}>
          <Text style={navStyles.navText}>Create Post</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('../imgs/capture.png')} style={{height: 80, width: 80}} />
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
    paddingVertical: 10,
    backgroundColor: '#272727',
    borderWidth: 1,
    borderColor: 'white',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
  },
  navText: {
    color: 'white',
    marginTop: 30,
    fontWeight: 'bold'
  },
});

export default NavBar;
