import { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Title, Button } from 'react-native-paper';
import { loginStyles } from '../styles/auth.styles';

export default function SignUpScreen() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  return (
    <View style={loginStyles.container}>
      <View style={loginStyles.formContainer}>
        <Title style={loginStyles.title}>Sign In</Title>
        <TextInput
          label='Full Name'
          value={fullName}
          onChangeText={(text) => setFullName(text)}
          style={loginStyles.input}
        />
        <TextInput
          label='Email'
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={loginStyles.input}
        />
        <TextInput
          label='Password'
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={loginStyles.input}
        />
        <TextInput
          label='Confirm Password'
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry
          style={loginStyles.input}
        />
        <Button
          style={loginStyles.signInButton}
          icon='account-arrow-right'
          onPress={() => {}}
        >
          Sign Up
        </Button>
        <Button
          mode='elevated'
          icon='google'
          style={loginStyles.googleButton}
          onPress={() => {}}
        >
          Continue with Google
        </Button>
      </View>
      <Button
        style={{ width: '80%' }}
        icon='account-question-outline'
        onPress={() => {}}
      >
        Already have an account? Log In
      </Button>
    </View>
  );
}
