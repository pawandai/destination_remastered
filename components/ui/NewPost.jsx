import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button, Switch } from 'react-native-paper';
import { loginStyles } from '../../styles/auth.styles';
import { Avatar } from 'react-native-paper';
import DropdownComponent from '../shared/Dropdown';

const NewPost = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      <View style={styles.title}>
        <Text style={{ fontSize: 24 }}>Create a new post</Text>
      </View>
      <View style={loginStyles.container}>
        <View style={loginStyles.formContainer}>
          <View style={styles.avatar}>
            <Avatar.Icon size={38} icon='folder' />
            <Text style={styles.avatarText}>Pawan Awasthi</Text>
          </View>
          <TextInput
            mode='outlined'
            multiline={true}
            numberOfLines={6}
            style={loginStyles.input}
            label='Post'
          />
          {/* Post as anonymous */}
          <View style={styles.ananymous}>
            <Text style={{ fontSize: 17 }}>Post as anonymous</Text>
            <Switch
              value={isSwitchOn}
              onValueChange={() => {
                setIsSwitchOn((prev) => !prev);
              }}
            />
          </View>
          {/* Visibility */}
          <View>
            <DropdownComponent />
          </View>
          <Button
            mode='elevated'
            style={loginStyles.signInButton}
            icon='upload'
            onPress={() => {}}
          >
            Post
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  avatar: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 20,
  },
  title: {
    marginTop: 100,
    display: 'flex',
    alignItems: 'center',
  },
  ananymous: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
});

export default NewPost;
