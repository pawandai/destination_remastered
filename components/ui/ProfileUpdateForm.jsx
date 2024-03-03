import { Text, View, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import ImagePickerUI from '../shared/ImagePickerUI';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { auth, storage } from '../../database/firebaseConfig';

const ProfileUpdateForm = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const user = auth.currentUser;

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
          console.log('getDownloadUrl: ', url);
          setProfileImageUrl(url);
        } catch (error) {
          console.log('error: ', error);
          return null;
        }
      }
    };

    uploadImage();
  }, [profileImage]);

  return (
    <View>
      <Text>Image Picker</Text>
      <View style={{ position: 'relative' }}>
        {profileImageUrl ? (
          <View style={{ borderRadius: '50%' }}>
            <Image
              source={{ uri: profileImageUrl ? profileImageUrl : profileImage }}
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
