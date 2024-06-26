import { useContext, useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { signOut } from 'firebase/auth';
import { Avatar, IconButton } from 'react-native-paper';
import { auth } from '../../database/firebaseConfig';
import { NavigationContext } from '../../App';
import ProfileUpdateForm from '../ui/ProfileUpdateForm';

const Profile = () => {
  const navigation = useContext(NavigationContext);
  const [profilePicture, setProfilePicture] = useState(null);
  const [fullName, setFullName] = useState('');

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ paddingHorizontal: 10, marginVertical: 50 }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}
            >
              {profilePicture ? (
                <Avatar.Image size={48} source={{ uri: profilePicture }} />
              ) : (
                <Avatar.Icon size={48} icon='account' />
              )}

              <Text style={{ fontSize: 17 }}>{fullName}</Text>
            </View>
            <IconButton
              icon='logout'
              contentStyle={{
                display: 'flex',
                flexDirection: 'row-reverse',
              }}
              onPress={() => {
                signOut(auth)
                  .then(() => {
                    navigation('Auth', { screen: 'Login' });
                  })
                  .catch((error) => {
                    console.log('navigation error: ', error);
                  });
              }}
            />
          </View>

          <ProfileUpdateForm setRefreshing={setRefreshing} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
