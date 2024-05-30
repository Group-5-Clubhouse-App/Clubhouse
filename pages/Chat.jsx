import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import CheckToken from '../components/CheckToken';
import GetMessages from '../components/GetMessages';

const Chat = ({ token, setToken, dmId, setDmId }) => {
  const scrollViewRef = useRef();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      setKeyboardHeight(event.endCoordinates.height);
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={[styles.container, { paddingBottom: keyboardHeight }]}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 150 : 0}
    >
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        onContentSizeChange={() => {
          if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
          }
        }}
      >
        <CheckToken token={token} setToken={setToken} />
        <View>
          <Text style={styles.welcomeText}>
            Welcome to the Clubhouse Chat, here is where you will see the messages of your DM thread!
          </Text>
          <GetMessages dmId={dmId} token={token} />
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
