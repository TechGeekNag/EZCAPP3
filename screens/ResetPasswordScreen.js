import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
//import { emailValidator } from '../components/utils';
import Background from '../components/Background';

import Logo from '../components/Logo';

import TextInput from '../components/TextInput';
import { theme } from '../components/theme';
import Button from '../components/ui/Button';

import { useNavigation } from '@react-navigation/native';


const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const navigation=useNavigation();
  const _onSendPressed = () => {
    //const emailError = emailValidator(email.value);

   /* if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }*/

    navigation.navigate('LoginScreen');
  };

  return (
    <Background>
      

      <Logo />

      <Text style={styles.header}>Restore Password</Text>

      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        //autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <Button mode="contained" onPress={_onSendPressed} style={styles.button}>
        Send Reset Instructions
      </Button>

      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate('LoginScreen')}
      >
        <Text style={styles.label}>← Back to login</Text>
      </TouchableOpacity>
    </Background>
  );
};

const styles = StyleSheet.create({
  back: {
    width: '100%',
    marginTop: 12,
  },
  button: {
    marginTop: 15,
    width: '100%',
    marginVertical: 10,
  },
  label: {
    color: theme.colors.secondary,
    width: '100%',
  },
  header: {
    fontSize: 28,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 14,
  }
});

export default ForgotPasswordScreen;
