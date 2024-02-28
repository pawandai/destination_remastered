import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 0,
    width: '100%',
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: 20,
    paddingVertical: 30,
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
    paddingHorizontal: 2,
  },
  signInButton: {
    marginTop: 20,
    marginVertical: 10,
  },
  googleButton: {
    marginTop: 20,
  },
});
