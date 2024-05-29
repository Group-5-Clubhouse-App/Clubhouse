import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CheckToken from '../components/CheckToken';
import UserSearchBar from '../components/UserSearchBar';
import GetDms from '../components/GetDms';

const DirectMessages = ({ token, setToken, dmId, setDmId }) => {

  return (
    <View>
      <CheckToken token={token} setToken={setToken} />
        <Text style={styles.welcomeText}>Welcome to the DM's page</Text>
        <UserSearchBar token={token} dmId={dmId} setDmId={setDmId}/>
    <ScrollView>
        <GetDms token={token} dmId={dmId} setDmId={setDmId}/>
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