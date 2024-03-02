import { Text, View, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import ImagePickerUI from '../shared/ImagePickerUI';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState, useEffect } from 'react';
import { auth } from '../../database/firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { ref } from '@firebase/storage';
import { storage } from '../../database/firebaseConfig';

const ProfileUpdateForm = () => {
  const [profileImage, setProfileImage] = useState('');

  const profilePictureRef = ref(storage, `images/profile/`);

  useEffect(async () => {
    const response = await fetch(profileImage);
    const blob = response.blob();
    const filename = profileImage.substring(profileImage.lastIndexOf('/') + 1);
    profilePictureRef.child(filename).put(blob);

    updateProfile(auth.currentUser, {
      photoURL: uploadedImage,
    });
  }, [profileImage]);

  return (
    <View>
      <Text>Image Picker</Text>
      <View style={{ position: 'relative' }}>
        {profileImage ? (
          <View style={{ borderRadius: '50%' }}>
            <Image
              source={{ uri: profileImage }}
              style={{ width: 200, height: 200 }}
            />
          </View>
        ) : (
          <MaterialCommunityIcons
            name='account-circle-outline'
            color={'#092303'}
            size={200}
          />
        )}
        <MaterialCommunityIcons
          style={{ position: 'absolute', bottom: 0, right: '45%' }}
          name='upload'
          color={'#092303'}
          size={40}
        />
      </View>
      <ImagePickerUI setProfileImage={setProfileImage} />
      <TextInput label='Name' />
    </View>
  );
};

export default ProfileUpdateForm;
