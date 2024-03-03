import { View, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { auth, storage } from '../../database/firebaseConfig';
import { updateProfile } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { loginStyles } from '../../styles/auth.styles';

const ProfileUpdateForm = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [newName, setNewName] = useState('');
  const user = auth.currentUser;

  useEffect(() => {
    setNewName(user.displayName);
  }, []);

  // Grab image from the device
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Upload profile image to Firebase storage
  useEffect(() => {
    const uploadImage = async () => {
      if (profileImage == null) {
        return null;
      } else {
        try {
          const imageFilename =
            user.email +
            '/userImages/profileImages/' +
            profileImage.substring(profileImage.lastIndexOf('/') + 1);

          const imageRef = ref(storage, imageFilename);
          const img = await fetch(profileImage);
          const bytes = await img.blob();
          await uploadBytes(imageRef, bytes);

          const url = await getDownloadURL(imageRef);
          updateProfile(user, {
            photoURL: url,
          });
        } catch (error) {
          console.log('error: ', error);
          return null;
        }
      }
    };

    uploadImage();
  }, [profileImage]);

  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          gap: -20,
          marginBottom: 50,
        }}
      >
        {user.photoURL || profileImage ? (
          <View style={{ borderRadius: 100, overflow: 'hidden', zIndex: 9 }}>
            <Image
              source={{ uri: profileImage ? profileImage : user.photoURL }}
              style={{ width: 180, height: 180, borderRadius: 100 }}
            />
          </View>
        ) : (
          <MaterialCommunityIcons
            name='account-circle-outline'
            color={'#092303'}
            size={180}
          />
        )}
        <MaterialCommunityIcons
          style={{ zIndex: 10 }}
          name='upload'
          color={'#092303'}
          size={40}
          onPress={pickImage}
        />
      </View>
      <TextInput
        value={newName}
        name='Name'
        mode='outlined'
        label='Name'
        style={{
          width: '90%',
          marginBottom: 25,
          ...loginStyles.input,
        }}
        onChangeText={(text) => {
          setNewName(text);
        }}
      />
      <Button
        mode='elevated'
        style={{ ...loginStyles.signInButton }}
        icon='upload'
        onPress={() => {
          // setRefreshing(true);
          updateProfile(user, {
            displayName: newName,
          });
        }}
      >
        Update Profile
      </Button>
    </View>
  );
};

export default ProfileUpdateForm;
