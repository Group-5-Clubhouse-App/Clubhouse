import { useEffect } from 'react';
import { AsyncStorage } from 'react-native';

const CheckToken = ({ navigation }) => {

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        
        // Need to write logic that token is authenticated first
        
        if (!token /* || !validToken */) {
          navigation.replace('Login');
        }
      } catch (error) {
        console.error('Error verifying token:', error);
      } 
    };

    verifyToken();
  }, []);

return null;

};

export default CheckToken;
