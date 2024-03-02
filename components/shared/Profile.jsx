import { useContext, useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { signOut } from 'firebase/auth';
import { Button, Avatar } from 'react-native-paper';
import { auth } from '../../database/firebaseConfig';
import { NavigationContext } from '../../App';
import ProfileUpdateForm from '../ui/ProfileUpdateForm';

const Profile = () => {
  const navigation = useContext(NavigationContext);
  const [profilePicture, setProfilePicture] = useState(null);
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged((user) => {
      if (user) {
        setProfilePicture(user.photoURL);
        setFullName(user.displayName);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View>
      <Text style={{ fontSize: 48 }}>Profile</Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}
      >
        {profilePicture !== null ? (
          <Avatar.Image size={48} source={profilePicture} />
        ) : (
          <Avatar.Icon size={48} icon='folder' />
        )}

        <Text>{fullName}</Text>
      </View>

      <ProfileUpdateForm />

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
