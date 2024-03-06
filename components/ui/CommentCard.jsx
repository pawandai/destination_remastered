import { StyleSheet, View, Text } from 'react-native';
import { Avatar, IconButton, Card, Button } from 'react-native-paper';
import { timeAgo } from '../../utils/timeFunctions';
import { auth } from '../../database/firebaseConfig';

const CommentCard = ({ comment, name, created, creator, imageUrl }) => {
  const user = auth.currentUser;
  const age = timeAgo(created);
  const createdAgo = age.split(' ')[0] + age.split(' ')[1];

  const LeftContent = (props) => (
    <Avatar.Image {...props} source={{ uri: imageUrl }} />
  );

  const UserRightContent = (props) => (
    <View
      style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
    >
      <IconButton {...props} icon='pencil-outline' iconColor='green' />
      <IconButton {...props} icon='trash-can-outline' iconColor='red' />
    </View>
  );

  const OtherRightContent = (props) => (
    <View {...props}>
      <Text>Edit</Text>
    </View>
  );

  return (
    <Card style={styles.card}>
      <Card.Title
        titleStyle={{
          textAlignVertical: 'center',
          fontSize: 16,
        }}
        title={name + ' | ' + createdAgo}
        subtitle={comment}
        subtitleStyle={{ color: 'grey' }}
        left={LeftContent}
        right={user.uid === creator ? UserRightContent : OtherRightContent}
      />

      <View style={styles.actionsContainer}>
        <Button mode='default' icon='heart-outline'>
          0
        </Button>
        <Button mode='default' icon='reply'>
          0
        </Button>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  card: {
    // flex: 1,
  },
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
