import { StyleSheet, View, Text } from 'react-native';
import { Avatar, IconButton, Card, Button } from 'react-native-paper';
import { auth, db } from '../../database/firebaseConfig';
import { commentTimeAgo } from '../../utils/timeFunctions';
import { useState } from 'react';
import { arrayRemove, doc, updateDoc } from 'firebase/firestore';

const CommentCard = ({
  comments,
  post,
  setCommentsArray,
  index,
  commentsArray,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const user = auth.currentUser;
  const age = commentTimeAgo(comments.createdAt.seconds);

  // Edit the user comment
  const editComment = () => {};

  // Delete the user comment
  const deleteComment = async () => {
    try {
      const commentRef = doc(db, 'posts', post.id);
      setCommentsArray((prev) => prev.splice([index], 1));
      await updateDoc(commentRef, {
        comments: commentsArray,
      });
      console.log('Comment deleted successfully');
      setShowConfirmation(false);
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
        onPress={() => setShowConfirmation(true)}
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
        subtitle={age}
        subtitleStyle={{ color: 'grey' }}
        left={LeftContent}
        right={user.uid === comments.creator ? UserRightContent : ''}
      />
      <Card.Content>
        <Text variant='bodyLarge'>
          {!showConfirmation
            ? comments.comment
            : 'Are you sure you want to proceed ?'}
        </Text>
      </Card.Content>

      {user ? (
        !showConfirmation ? (
          <View style={styles.actionsContainer}>
            {/* Like the comment */}
            <Button mode='default' icon='heart-outline'>
              0
            </Button>
            {/* Reply to the comment */}
            <Button mode='default' icon='comment-text-outline'>
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
            <Button
              labelStyle={{ color: 'red' }}
              mode='default'
              icon='check'
              onPress={deleteComment}
            >
              Delete
            </Button>
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
