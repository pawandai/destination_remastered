import { StyleSheet, View } from 'react-native';
import LoginScreen from '../LoginScreen';
import { StatusBar } from 'expo-status-bar';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import SignUpScreen from '../SignUpScreen';
import React, { Suspense } from 'react';

const Stack = createStackNavigator();

const LazyLoginScreen = React.lazy(() => import('../LoginScreen'));
const LazySignUpScreen = React.lazy(() => import('../SignUpScreen'));

export default function AuthScreen() {
  return (
    <View style={styles.maxWidthContainer}>
      <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS, // Apply slide from right animation
        }}
      >
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Signup' component={SignUpScreen} />
      </Stack.Navigator>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  maxWidthContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
});
