import React from 'react';
import { View, Text } from 'react-native';
import ChangeAccountDetails from '../components/ChangeAccountDetails';
import CheckToken from '../components/CheckToken';

const Settings = () => {
  return (
    <View>
      <CheckToken />
      <ChangeAccountDetails />
    </View>
  );
};

export default Settings;