import { useState, useEffect, createContext } from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import AuthScreen from './components/auth/AuthScreen';
import { auth } from './database/firebaseConfig';
import HomeNavigation from './pages/HomeNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-native-paper';

export const NavigationContext = createContext();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <Provider>
      <SafeAreaProvider>
        <NavigationContext.Provider value={null}>
          <NavigationContainer>
            {isAuthenticated ? <HomeNavigation /> : <AuthScreen />}
            <Toast />
            <StatusBar style='auto' />
          </NavigationContainer>
        </NavigationContext.Provider>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  maxWidthContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
});
