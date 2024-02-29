import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import AuthScreen from './components/auth/AuthScreen';

export default function App() {
  return (
    <NavigationContainer>
      <AuthScreen />
      <Toast />
      <StatusBar style='auto' />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  maxWidthContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
});
