import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

const EmailVerificationPage = ({ navigation }) => {
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text>Once you verified your email, you can login to this app</Text>
      <Button
        onPress={() => {
          navigation.navigate('login');
        }}
      >
        Login
      </Button>
    </View>
  );
};

export default EmailVerificationPage;
