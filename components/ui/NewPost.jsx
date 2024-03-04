import { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { TextInput, Button, Switch } from 'react-native-paper';
import { loginStyles } from '../../styles/auth.styles';
import { Avatar } from 'react-native-paper';
import DropdownComponent from '../shared/Dropdown';
import { auth, db } from '../../database/firebaseConfig';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';

const NewPost = () => {
  // const [isSwitchOn, setIsSwitchOn] = useState(false);
  // const [selectedItem, setSelectedItem] = useState(null);
  const [postContent, setPostContent] = useState('');
  const date = new Date().getDate();
  const month = new Date().getMonth();
  //const year = new Date().getFullYear();
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const user = auth.currentUser;

  const postToDatabase = () => {
    try {
      const postRef = doc(collection(db, `collections/${user.email}/posts`));
      setDoc(postRef, {
        id: user.uid,
        content: postContent,
        likes: [],
        shares: [],
        comments: [],
        created: serverTimestamp(Date),
        postedDate: date + ' ' + months[month],
      });
    } catch (error) {
      console.log('Error: ' + error);
    }
  };

  return (
    <>
      <KeyboardAvoidingView>
        <View style={styles.title}>
          <Text style={{ fontSize: 24 }}>Create a new post</Text>
        </View>
        <View style={loginStyles.container}>
          <View style={loginStyles.formContainer}>
            <View style={styles.avatar}>
              <Avatar.Image size={38} source={{ uri: user.photoURL }} />
              <Text style={styles.avatarText}>{user.displayName}</Text>
            </View>
            <TextInput
              mode='outlined'
              multiline={true}
              numberOfLines={6}
              style={loginStyles.input}
              label='Post'
              onChangeText={(text) => setPostContent(text)}
            />
            {/* Post as anonymous */}
            {/* <View style={styles.ananymous}>
              <Text style={{ fontSize: 17 }}>Post as anonymous</Text>
              <Switch
                value={isSwitchOn}
                onValueChange={() => {
                  setIsSwitchOn((prev) => !prev);
                }}
              />
            </View> */}
            {/* Visibility */}
            {/* <View>
              <DropdownComponent />
            </View> */}
            <Button
              mode='elevated'
              style={loginStyles.signInButton}
              icon='upload'
              onPress={postToDatabase}
            >
              Post
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
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
