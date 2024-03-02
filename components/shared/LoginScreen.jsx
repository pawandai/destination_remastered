import { useState } from 'react';
import { Text, View } from 'react-native';
import { TextInput, Title, Button } from 'react-native-paper';
import { loginStyles } from '../../styles/auth.styles';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../database/firebaseConfig';
import Toast from 'react-native-toast-message';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const logIn = async () => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('Here is logged in user: ', user);
        navigation.navigate('HomePage');
        Toast.show({
          type: 'success',
          text1: 'User logged in successfully',
          text1Style: {
            fontSize: 17,
            fontWeight: '400',
            textAlign: 'center',
            color: 'rgb(0, 0, 0)',
          },
        });
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        console.log(error);
        Toast.show({
          type: 'error',
          text1: 'Please provide correct email and password',
          text1Style: {
            fontSize: 17,
            fontWeight: '400',
            textAlign: 'center',
            color: 'rgb(255, 0, 0)',
          },
        });
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return (
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 48 }}>Loading...Please Wait...</Text>
      </View>
    );
  }

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
          onPress={logIn}
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
