import { StyleSheet, View, Text } from 'react-native';
import { Avatar, IconButton, Card, Button } from 'react-native-paper';
import { timeAgo } from '../../utils/timeFunctions';
import { auth } from '../../database/firebaseConfig';

const CommentCard = ({ comments }) => {
  const user = auth.currentUser;
  const age = timeAgo(comments.createdAt);
  const createdAgo = age.split(' ')[0] + age.split(' ')[1];

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
        onPress={() => {}}
        {...props}
        icon='pencil-outline'
        iconColor='green'
      />
      <IconButton
        onPress={() => {}}
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
        subtitle={createdAgo}
        subtitleStyle={{ color: 'grey' }}
        left={LeftContent}
        right={user.uid === comments.creator ? UserRightContent : ''}
      />
      <Card.Content>
        <Text variant='bodyLarge'>{comments.comment}</Text>
      </Card.Content>

      {user ? (
        <View style={styles.actionsContainer}>
          <Button mode='default' icon='heart-outline'>
            0
          </Button>
          <Button mode='default' icon='comment-text-outline'>
            0
          </Button>
        </View>
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
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default CommentCard;
