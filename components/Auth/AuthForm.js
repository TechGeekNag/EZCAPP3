import { useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import Button from '../ui/Button';
import Input from './Input';
import Background from '../Background';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';
import Logo from '../Logo';
import TextInput from '../TextInput';
import ResetPasswordScreen from '../../screens/ResetPasswordScreen';

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const navigation = useNavigation();
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');
  const [email, setEmail] = useState({ value: 'test@test.com', error: '' })
  const [password, setPassword] = useState({ value: '234325435', error: '' })

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'confirmEmail':
        setEnteredConfirmEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'confirmPassword':
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <Background>
     <Logo />
     <TextInput
        label="User Name"
        returnKeyType="next"
        value={enteredEmail}
        onChangeText={(text) => updateInputValueHandler('email', text)}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password" 
        returnKeyType="done"
        value={enteredPassword}
        onChangeText={(text) => updateInputValueHandler('password',text)}
        secureTextEntry
      />
       <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('DashBoardScreen')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained"  onPress={submitHandler}>
        Login
      </Button>
        
    
    </Background>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
    fontSize:100
  },

  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

