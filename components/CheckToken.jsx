import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const CheckToken = ({token, setToken}) => {
  const navigation = useNavigation();
  const navigateToScreen = (screenName) => {
    navigation.replace(screenName);
  };

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token || token === null) {
          navigateToScreen('Login')
        }
      } catch (error) {
        console.error('Error verifying token:', error);
      } 
    };
    verifyToken();
  }, [navigation, token, setToken]);
return null;
};

export default CheckToken;
