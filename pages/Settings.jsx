import React from 'react';
import { View, Text } from 'react-native';
import ChangeAccountDetails from '../components/ChangeAccountDetails';
import CheckToken from '../components/CheckToken';

const Settings = ({token, setToken}) => {
  return (
    <View>
      <CheckToken token={token} setToken={setToken}/>
      <ChangeAccountDetails />
    </View>
  );
};

export default Settings;