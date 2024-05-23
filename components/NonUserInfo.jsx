import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';

const UserInfo = ({userid}) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!userid) {
        setError(new Error('No token found'));
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`https://clubhouse-6uml.onrender.com/api/user/${userid}`);
        if (!response.ok) {
          throw new Error('Network response was not okay');
        }
        const data = await response.json();
        setUser([data]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <ActivityIndicator size={'large'} color='#0000ff' />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View>
      <ScrollView>
      {user.map((user, index) => (
        <View key={index} style={styles.container}>
          <View style={styles.userInfo}>
            <Image source={
             typeof user.profile_icon === 'string' && user.profile_icon.startsWith('http')
             ? { uri: user.profile_icon }
             : require('../imgs/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg')
             } style={styles.profileIcon} />
            <Text style={styles.username}>{user.username}</Text>
          </View>
          <Text style={styles.bio}>{user.bio}</Text>
          </View>
      ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#EBEBEB',
    borderWidth: 1
  },
  flatListContainer: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileIcon: {
    width: 80,
    height: 80,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row'
  },
  username: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20
  },
  bio: {
    fontSize: 16,
    color: '#666',
    marginTop: 20
  },
});

const settingsButton = StyleSheet.create ({
  button:{
    padding: 10,
    backgroundColor: 'slategrey',
    color: 'white',
    borderRadius: 10,
    borderWidth: 1,
    width: 80.2, 
    height: 40,
    marginLeft: 90
  }
})

export default UserInfo;
