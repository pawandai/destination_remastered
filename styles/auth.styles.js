import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 0,
    width: '100%',
    backgroundColor: '#fff',
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.01)',
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
    paddingHorizontal: 10,
  },
  signInButton: {
    marginTop: 20,
    paddingVertical: 10,
  },
  googleButton: {
    marginTop: 20,
  },
});
