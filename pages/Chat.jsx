import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CheckToken from '../components/CheckToken';

const Chat = ({ token, setToken }) => {

  return (
    <ScrollView>
      <CheckToken token={token} setToken={setToken} />
      <View>
        <Text style={styles.welcomeText}>Welcome to the Clubhouse Chat, here is where you will see the messages of your DM thread!</Text>
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

export default Chat;