import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CheckToken from '../components/CheckToken';

const DirectMessages = ({ token, setToken }) => {

  return (
    <ScrollView>
      <CheckToken token={token} setToken={setToken} />
      <View>
        <Text style={styles.welcomeText}>Welcome to the DM's page</Text>
      </View>
    </ScrollView>
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