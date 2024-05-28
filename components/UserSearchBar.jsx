import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const UserSearchBar = ({token}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userToFind, setUserToFind] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigation();
  const navigateToChat = (data) => {
    navigate.navigate('Chat', {chatData: data});
  }

  const handleSearch = (query) => {
    const lowercaseQuery = query.toLowerCase();
    setSearchQuery(lowercaseQuery);
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (searchQuery.trim() === '') {
        setUserToFind(null);
        setError(null);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`https://clubhouse-6uml.onrender.com/api/search/user/${searchQuery}`);
        if (!response.ok) {
          throw new Error('User not found');
        }
        const data = await response.json();
        setUserToFind(data);
        setError(null);
      } catch (error) {
        setUserToFind(null);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [searchQuery]);

  const handleMakeDm = async(chosenUserid) => {
    const decodedToken = jwtDecode(token);
    const userid = decodedToken.userId;
    try {
      const response = await axios.post(`https://clubhouse-6uml.onrender.com/api/dm`, {
        senderId: userid,
        recipientId: chosenUserid
      }
    )
    const data = response.data;
    console.log(data);
    navigateToChat(data);

    } catch (error) {
      throw error
    }

  }

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search users..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <View style={styles.userBox}>
      {searchQuery.trim() !== '' && (
        <View style={styles.userInfo}>
          {loading && <Text style={{marginTop: 33}}>Loading...</Text>}
          {!loading && error && <Text style={styles.error}>{error}</Text>}
          {!loading && userToFind && (
           <TouchableOpacity onPress={() => {
           handleMakeDm(userToFind.id);
             }}>
            <View style={styles.userInfo}>
              <Image
                source={
                  typeof userToFind.profile_icon === 'string' && userToFind.profile_icon.startsWith('http')
                    ? { uri: userToFind.profile_icon }
                    : require('../imgs/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg')
                }
                style={styles.profileIcon}
              />
              <Text style={styles.username}>{userToFind.username}</Text>
            </View>
            </TouchableOpacity>
          )}
          {!loading && !userToFind && !error && <Text>No user by that username</Text>}
        </View>
      )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#EBEBEB',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  profileIcon: {
    width: 70,
    height: 70,
    borderRadius: 20,
    marginTop: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 10
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginTop: 33
  },
  userBox: {
    borderWidth: 1,
    height: 95,
    marginBottom: 30
  }
});

export default UserSearchBar;
