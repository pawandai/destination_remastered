import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 0,
    width: '100%',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    marginTop: 20,
  },
  title: {
    marginBottom: 20,
    color: 'black',
    textAlign: 'center',
    fontSize: 28,
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'transparent',
    borderRadius: 20,
    fontSize: 17,
  },
  signInButton: {
    marginTop: 20,
    paddingVertical: 10,
  },
  googleButton: {
    marginTop: 20,
  },
});
