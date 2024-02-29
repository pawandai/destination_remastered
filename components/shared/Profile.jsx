import { Text, View } from 'react-native';
import { signOut } from 'firebase/auth';
import { Button } from 'react-native-paper';
import { auth } from '../../database/firebaseConfig';

const Profile = ({ navigation }) => {
  return (
    <View>
      <Text style={{ fontSize: 48 }}>Profile</Text>
      <Button
        onPress={() => {
          signOut(auth)
            .then(() => {
              navigation.navigate('Login');
            })
            .catch((error) => {
              // An error happened.
            });
        }}
      >
        Sign Out
      </Button>
    </View>
  );
};

export default Profile;
