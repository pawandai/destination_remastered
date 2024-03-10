import { StyleSheet, View, Text } from 'react-native';
import {
  Avatar,
  IconButton,
  Card,
  Button,
  TextInput,
} from 'react-native-paper';
import { auth, db } from '../../database/firebaseConfig';
import { commentTimeAgo } from '../../utils/timeFunctions';
import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import Toast from 'react-native-toast-message';

const CommentCard = ({
  comments,
  post,
  setCommentsArray,
  index,
  commentsArray,
  fetchComments,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState('');
  const user = auth.currentUser;
  const age = commentTimeAgo(comments.createdAt.seconds);

  // Edit the user comment
  const editComment = () => {
    setNewComment(comments.comment);
    setIsEditing(true);
    setShowConfirmation(true);
  };
  const editCommentHandler = async () => {
    try {
      const commentRef = doc(db, 'posts', post.id);
      const updatedComments = commentsArray.map((databaseComment) => {
        // Check for comment ID match
        if (databaseComment.id === comments.id) {
          return { ...databaseComment, comment: newComment, edited: true };
        } else {
          return databaseComment; // Keep other comments unchanged
        }
      });

      await updateDoc(commentRef, { comments: updatedComments }).then(() => {
        setIsEditing(false);
        setShowConfirmation(false);
        fetchComments();
      });
      console.log('Comment updated successfully!');
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'You cannot like and reply to the comments.',
      text2: 'We are working on that feature  ;-)',
      text1Style: {
        fontSize: 17,
        fontWeight: '400',
        textAlign: 'center',
        color: 'rgb(0, 0, 0)',
      },
      text2Style: {
        fontSize: 17,
        fontWeight: '400',
        textAlign: 'center',
        color: 'rgb(0, 0, 0)',
      },
    });
  };

  // Delete the user comment
  const deleteComment = async () => {
    try {
      const commentRef = doc(db, 'posts', post.id);
      setCommentsArray((prev) => prev.splice([index], 1));
      await updateDoc(commentRef, {
        comments: commentsArray,
      }).then(() => {
        setShowConfirmation(false);
        console.log('Comment deleted successfully');
        fetchComments();
      });
    } catch (error) {
      console.log('Error deleting comment ', error);
    }
  };

  const LeftContent = (props) => (
    <Avatar.Image {...props} source={{ uri: comments.profilePicture }} />
  );

  const UserRightContent = (props) => (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: -10,
      }}
    >
      <IconButton
        onPress={editComment}
        {...props}
        icon='pencil-outline'
        iconColor='green'
      />
      <IconButton
        onPress={() => {
          setIsEditing(false);
          setShowConfirmation(true);
        }}
        {...props}
        icon='trash-can-outline'
        iconColor='red'
      />
    </View>
  );

  return (
    <Card style={styles.card}>
      <Card.Title
        titleStyle={{
          textAlignVertical: 'center',
          fontSize: 16,
        }}
        title={comments.creatorName}
        subtitle={`${age} ${comments.edited ? '(edited)' : ''}`}
        subtitleStyle={{ color: 'grey' }}
        left={LeftContent}
        right={user.uid === comments.creator ? UserRightContent : ''}
      />
      <Card.Content>
        <Text variant='bodyLarge'>
          {!showConfirmation ? (
            comments.comment
          ) : isEditing ? (
            <TextInput
              placeholder='Edit Comment'
              value={newComment}
              onChangeText={(text) => setNewComment(text)}
            />
          ) : (
            'Are you sure you want to proceed ?'
          )}
        </Text>
      </Card.Content>

      {user ? (
        !showConfirmation ? (
          <View style={styles.actionsContainer}>
            {/* Like the comment */}
            <Button mode='default' icon='heart-outline' onPress={showToast}>
              0
            </Button>
            {/* Reply to the comment */}
            <Button
              mode='default'
              icon='comment-text-outline'
              onPress={showToast}
            >
              0
            </Button>
          </View>
        ) : (
          <View style={styles.actionsContainer}>
            <Button
              mode='default'
              icon='window-close'
              onPress={() => setShowConfirmation(false)}
            >
              Cancel
            </Button>
            {!isEditing ? (
              <Button
                labelStyle={{ color: 'red' }}
                mode='default'
                icon='check'
                onPress={deleteComment}
              >
                Delete
              </Button>
            ) : (
              <Button
                labelStyle={{ color: 'green' }}
                mode='default'
                icon='check'
                onPress={() => {
                  editCommentHandler(comments.id);
                }}
              >
                Edit
              </Button>
            )}
          </View>
        )
      ) : null}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  card: {},
  actionsContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default CommentCard;
