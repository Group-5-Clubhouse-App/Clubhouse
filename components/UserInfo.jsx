import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { jwtDecode } from 'jwt-decode';

const UserInfo = ({token}) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const decodedToken = jwtDecode(token);
      const userid = decodedToken.userId;
      if (!token) {
        setError(new Error('No token found'));
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`https://clubhouse-6uml.onrender.com/api/user/${userid}`);
        if (!response.ok) {
          throw new Error('Network response was not okay');
        }
        console.log(response)
        const data = await response.json();
        console.log(data)
        setUser([data]);
        console.log(user)
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
          <Text style={{fontWeight: 'bold', fontSize: 16, marginVertical: 4}}>{user.bio}</Text>
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
    backgroundColor: '#fff',
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
    width: 10,
    height: 10,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 14,
    color: '#666',
  },
});

export default UserInfo;
