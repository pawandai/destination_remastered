import { View } from 'react-native';
import { Avatar, Button, IconButton, Card, Text } from 'react-native-paper';
import { timeAgo } from '../../utils/timeFunctions';
import { auth } from '../../database/firebaseConfig';

const PostCard = ({ imageUrl, name, cardContent, created, creator }) => {
  const user = auth.currentUser;

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

  const OthersRightContent = (props) => (
    <IconButton {...props} icon='bookmark-outline' />
  );

  const age = timeAgo(created);

  return (
    <Card mode='elevated' style={{ margin: 20 }}>
      <Card.Title
        titleStyle={{
          textAlignVertical: 'center',
          fontSize: 17,
        }}
        title={name}
        subtitle={age}
        subtitleStyle={{ color: 'grey' }}
        left={LeftContent}
        right={user.uid === creator ? UserRightContent : OthersRightContent}
      />
      <Card.Content>
        <Text variant='bodyLarge'>{cardContent}</Text>
      </Card.Content>

      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 10,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Button mode='default' icon='heart-outline'>
          0
        </Button>
        <Button mode='default' icon='comment-text-outline'>
          0
        </Button>
        <Button mode='default' icon='share-outline'>
          0
        </Button>
      </View>
    </Card>
  );
};

export default PostCard;
