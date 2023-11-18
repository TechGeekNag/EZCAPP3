import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import FlatButton from '../ui/FlatButton';
import AuthForm from './AuthForm';
import { Colors } from '../../constants/styles';

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    
      navigation.replace('Login');
    
  }

  function submitHandler(credentials) {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.length>0;
    const passwordIsValid = password.length > 0;
  
    if (
      !emailIsValid ||
      !passwordIsValid ) {
      Alert.alert('Invalid input', 'Please  enter credentials.');
      setCredentialsInvalid({
        email: !emailIsValid,
       // confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        //confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    
    onAuthenticate({ email, password });
  }
  

  return (
    <View style={{flex:1}}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
   
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});
