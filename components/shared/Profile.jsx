import { useContext, useState } from 'react';
import { Text, View } from 'react-native';
import { signOut } from 'firebase/auth';
import { Button, Avatar } from 'react-native-paper';
import { auth } from '../../database/firebaseConfig';
import { NavigationContext } from '../../App';

const Profile = () => {
  const navigation = useContext(NavigationContext);
  const [profilePicture, setProfilePicture] = useState('');

  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       setProfilePicture(user.photoURL);
  //     }
  //   });
  // }, []);

  return (
    <View>
      <Text style={{ fontSize: 48 }}>Profile</Text>
      {/* {profilePicture ? (
        <Avatar.Image size={24} source={require(profilePicture)} />
      ) : ( */}
      <Avatar.Icon size={24} icon='folder' />
      {/* )} */}
      <Button
        onPress={() => {
          signOut(auth)
            .then(() => {
              navigation('Auth', { screen: 'Login' });
            })
            .catch((error) => {
              console.log('navigation error: ', error);
            });
        }}
      >
        Sign Out
      </Button>
    </View>
  );
};

export default Profile;
