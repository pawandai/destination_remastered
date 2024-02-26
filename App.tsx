import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import LoginScreen from './components/LoginScreen';

export default function App() {
  return (
    <View style={styles.maxWidthContainer}>
      <LoginScreen />
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
