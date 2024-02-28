import { View } from 'react-native';
import { loginStyles } from '../../styles/auth.styles';
import { Avatar } from 'react-native-paper';

const NewPost = () => {
  return (
    <View style={loginStyles.container}>
      <View style={loginStyles.formContainer}>
        <Avatar.Icon size={24} icon='folder' />
      </View>
    </View>
  );
};

export default NewPost;
