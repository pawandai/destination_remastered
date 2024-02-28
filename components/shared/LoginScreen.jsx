import { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Title, Button } from 'react-native-paper';
import { loginStyles } from '../../styles/auth.styles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={loginStyles.container}>
      <View style={loginStyles.formContainer}>
        <Title style={loginStyles.title}>Sign In</Title>
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
        <Button
          style={loginStyles.signInButton}
          icon='account-arrow-right'
          onPress={() => {}}
        >
          Sign In
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
        onPress={() => {
          navigation.navigate('Signup');
        }}
      >
        Don't have an account? Register here
      </Button>
    </View>
  );
}
