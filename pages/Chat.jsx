import React from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import CheckToken from '../components/CheckToken';
import GetMessages from '../components/GetMessages';

const Chat = ({ token, setToken, dmId, setDmId }) => {

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.container}
      keyboardVerticalOffset={150}
    >
      <ScrollView>
        <CheckToken token={token} setToken={setToken} />
        <View>
          <Text style={styles.welcomeText}>Welcome to the Clubhouse Chat, here is where you will see the messages of your DM thread!</Text>
          <GetMessages dmId={dmId} token={token}/>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
});

export default Chat;
