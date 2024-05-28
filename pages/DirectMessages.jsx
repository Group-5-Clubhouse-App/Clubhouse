import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CheckToken from '../components/CheckToken';
import UserSearchBar from '../components/UserSearchBar';
import GetDms from '../components/GetDms';

const DirectMessages = ({ token, setToken }) => {

  return (
    <View>
      <CheckToken token={token} setToken={setToken} />
        <Text style={styles.welcomeText}>Welcome to the DM's page</Text>
        <UserSearchBar token={token}/>
    <ScrollView>
        <GetDms token={token} />
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
});

export default DirectMessages;