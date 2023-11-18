import { useContext, useState } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { login } from '../util/auth';


function LoginScreen() {
  console.log('9th line in loginscreen');

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [pushToken, setPushToken] = useState();


  const authCtx = useContext(AuthContext);


  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      console.log('checking credentials');
      const response =  await login(email, password);
      console.log('checking credentials response::'+response);
      authCtx.authenticate(response.token.toString(),response.userType.toString());
      setIsAuthenticating(false);

    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials or try again later!'
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
