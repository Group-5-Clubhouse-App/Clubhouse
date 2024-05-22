import React from 'react';
import { View, Text } from 'react-native';
import ChangeAccountDetails from '../components/ChangeAccountDetails';
import CheckToken from '../components/CheckToken';
import Logout from '../components/Logout';

const Settings = ({token, setToken}) => {
  return (
    <View>
      <CheckToken token={token} setToken={setToken}/>
      <ChangeAccountDetails token={token} setToken={setToken}/>
      <Logout token={token} setToken={setToken}/>
    </View>
  );
};

export default Settings;