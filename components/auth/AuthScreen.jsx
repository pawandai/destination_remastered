import { StyleSheet, View } from 'react-native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import LoginScreen from '../shared/LoginScreen';
import SignUpScreen from '../shared/SignupScreen';
import HomeNavigation from '../../pages/HomeNavigation';
import EmailVerificationPage from '../ui/EmailVerificationPage';

const Stack = createStackNavigator();

export default function AuthScreen() {
  return (
    <View style={styles.maxWidthContainer}>
      <Stack.Navigator
        initialRouteName='Auth'
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Signup' component={SignUpScreen} />
        <Stack.Screen name='HomePage' component={HomeNavigation} />
        <Stack.Screen
          name='EmailVerificationPage'
          component={EmailVerificationPage}
        />
      </Stack.Navigator>
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
