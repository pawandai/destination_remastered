import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { TextInput, Title, Button } from 'react-native-paper';
import { loginStyles } from '../../styles/auth.styles';
import { auth, db } from '../../database/firebaseConfig';
import Toast from 'react-native-toast-message';
import { collection, addDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const createNewUser = () => {
    setIsLoading(true);
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
      setIsLoading(false);
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          setIsLoading(true);
          updateProfile(auth.currentUser, {
            displayName: fullName,
          });
          sendEmailVerification(auth.currentUser).then(() => {
            console.log('Email verification link send successfully.');
            Toast.show({
              type: 'success',
              text1: 'Verifiction link has been sent to your email',
              text1Style: {
                fontSize: 17,
                fontWeight: '400',
                textAlign: 'center',
                color: 'rgb(0, 0, 0)',
              },
            });
          });
          try {
            const docRef = await addDoc(collection(db, 'users'), {
              id: userCredential.user.uid,
              name: fullName,
              email: email,
              dob: 2012,
            });
            console.log('Document written with ID: ', docRef.id);
            Toast.show({
              type: 'success',
              text1: 'User created successfully',
              text1Style: {
                fontSize: 17,
                fontWeight: '400',
                textAlign: 'center',
                color: 'rgb(0, 0, 0)',
              },
            });
          } catch (e) {
            console.error('Error adding document: ', e);
          }
          setIsLoading(false);
          navigation.navigate('EmailVerificationPage');
        })
        .catch(() => {
          Toast.show({
            type: 'error',
            text1: 'Something went wrong, please use stronger password.',
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
    }
  };

  if (isLoading)
    return (
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 48 }}>Loading. Please Wait...</Text>
      </View>
    );

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
