import { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Title, Button } from 'react-native-paper';
import { loginStyles } from '../../styles/auth.styles';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={loginStyles.container}>
      <View style={loginStyles.formContainer}>
        <Title style={loginStyles.title}>Register With Us</Title>
        <TextInput
          label='Full Name'
          mode='flat'
          value={fullName}
          onChangeText={(text) => setFullName(text)}
          style={loginStyles.input}
        />
        <TextInput
          label='Email'
          mode='flat'
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={loginStyles.input}
        />
        <TextInput
          label='Password'
          mode='flat'
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={loginStyles.input}
        />
        <TextInput
          label='Confirm Password'
          mode='flat'
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
        icon='account-outline'
        onPress={() => {
          navigation.navigate('Login');
        }}
      >
        Already have an account? Log In
      </Button>
    </View>
  );
}
