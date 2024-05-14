import { useEffect } from 'react';
import { AsyncStorage } from 'react-native';

const CheckToken = ({ navigation }) => {

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Retrieve token from AsyncStorage
        const token = await AsyncStorage.getItem('token');
        
        // Need to write logic that token is authenticated first
        
        if (!token /* || !validToken */) {
          // Below has to be changed once we have the name of the page routes! It should refer them to whatever page they are currently trying to access.
          navigation.replace('LoginScreen');
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
