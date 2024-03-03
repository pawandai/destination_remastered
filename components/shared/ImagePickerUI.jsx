import { Button, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerUI({ setProfileImage }) {
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

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 40 }}>Pick image here</Text>
      <Button title='Pick an image from camera roll' onPress={pickImage} />
    </View>
  );
}
