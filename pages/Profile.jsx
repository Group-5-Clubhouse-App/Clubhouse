import React from 'react';
import { View } from 'react-native';
import CheckToken from '../components/CheckToken';
import GetAllUserPosts from '../components/GetUserPost';
import UserInfo from '../components/UserInfo';

const Profile = ({token, setToken}) => {
  return (
    <View>
      <CheckToken token={token} setToken={setToken}/>
      <View>
        <UserInfo token={token}/>
      </View>
      <GetAllUserPosts token={token}/>
    </View>
  );
};


export default Profile;