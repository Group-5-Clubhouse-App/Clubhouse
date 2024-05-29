import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Notifications from "./pages/Notifications";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DirectMessages from "./pages/DirectMessages";
import Chat from "./pages/Chat";
import UserProfile from "./pages/UserProfile";

const Stack = createStackNavigator();

const App = () => {
  const [token, setToken] = useState("");
  const [otherUserid, setOtherUserid] = useState("");
  const [dmId, setDmId] = useState("");
  useEffect(() => {
    const getToken = async () => {
      const initialToken = await AsyncStorage.getItem("token");
      setToken(initialToken);
    };
    getToken();
  }, [token, setToken]);

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#272727",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="Home"
            options={{ cardStyle: styles.containerForScreens }}
          >
            {(props) => (
              <Home
                {...props}
                token={token}
                setToken={setToken}
                otherUserid={otherUserid}
                setOtherUserid={setOtherUserid}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Settings"
            options={{ cardStyle: styles.containerForScreens }}
          >
            {(props) => (
              <Settings {...props} token={token} setToken={setToken} />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Login"
            options={{ cardStyle: styles.containerForScreens }}
          >
            {(props) => <Login {...props} setToken={setToken} />}
          </Stack.Screen>
          <Stack.Screen
            name="Notifications"
            options={{ cardStyle: styles.containerForScreens }}
          >
            {(props) => (
              <Notifications
                {...props}
                token={token}
                setToken={setToken}
                otherUserid={otherUserid}
                setOtherUserid={setOtherUserid}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Post"
            options={{ cardStyle: styles.containerForScreens }}
          >
            {(props) => <Post {...props} token={token} setToken={setToken} />}
          </Stack.Screen>
          <Stack.Screen
            name="Profile"
            options={{ cardStyle: styles.containerForScreens }}
          >
            {(props) => (
              <Profile {...props} token={token} setToken={setToken} />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Register"
            options={{ cardStyle: styles.containerForScreens }}
          >
            {(props) => <Register {...props} setToken={setToken} />}
          </Stack.Screen>
          <Stack.Screen
            name="Direct Messages"
            options={{ cardStyle: styles.containerForScreens }}
          >
            {(props) => (
              <DirectMessages
                {...props}
                token={token}
                setToken={setToken}
                dmId={dmId}
                setDmId={setDmId}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Chat"
            options={{ cardStyle: styles.containerForScreens }}
          >
            {(props) => (
              <Chat
                {...props}
                setToken={setToken}
                dmId={dmId}
                setDmId={setDmId}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="User Profile"
            options={{ cardStyle: styles.containerForScreens }}
          >
            {(props) => (
              <UserProfile
                {...props}
                setToken={setToken}
                otherUserid={otherUserid}
                setOtherUserid={setOtherUserid}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
        <NavBar token={token} />
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#272727",
    alignItems: "stretch",
    justifyContent: "center",
    paddingBottom: 40,
  },
  containerForScreens: {
    flex: 1,
    backgroundColor: "#EBEBEB",
    alignItems: "stretch",
    justifyContent: "center",
    padding: 10,
  },
});

export default App;
