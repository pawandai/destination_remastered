import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { KeyboardAvoidingView, View } from 'react-native';
import { TextInput, Title, Button } from 'react-native-paper';
import { loginStyles } from '../../styles/auth.styles';
import { auth } from '../../database/firebaseConfig';
import Toast from 'react-native-toast-message';
// import { collection, addDoc } from 'firebase/firestore';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const createNewUser = () => {
    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Passwords do not match',
        text1Style: {
          fontSize: 17,
          fontWeight: '400',
          textAlign: 'center',
          color: 'rgb(255, 0, 0)',
        },
      });
    } else {
      createUserWithEmailAndPassword(auth, email, password).then(
        async (userCredential) => {
          const user = userCredential.user;
          user.displayName = fullName;
          console.log(user);
          // try {
          //   const docRef = await addDoc(collection(db, 'users'), {
          //     name: fullName,
          //     email: email,
          //     born: 1815,
          //   });
          //   console.log('Document written with ID: ', docRef.id);
          // } catch (e) {
          //   console.error('Error adding document: ', e);
          // }
        }
      );
      navigation.navigate('HomePage');
    }
  };

  return (
    <View style={loginStyles.container}>
      <KeyboardAvoidingView>
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
            onPress={createNewUser}
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
      </KeyboardAvoidingView>
    </View>
  );
}
