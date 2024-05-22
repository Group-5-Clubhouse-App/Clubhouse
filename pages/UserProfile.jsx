import React from 'react';
import { View, Text } from 'react-native';
import NonUserInfo from '../components/NonUserInfo';
import GetNonUserPost from '../components/GetNonUserPost';


const UserProfile = ({otherUserid}) => {
  
  return (
    <View>
      <View>
        <NonUserInfo userid={otherUserid} />
      </View>
        <GetNonUserPost userid={otherUserid} />
    </View>
  );
};


export default UserProfile;