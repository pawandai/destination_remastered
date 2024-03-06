import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  LayoutAnimation,
  ScrollView,
} from 'react-native';
import { Avatar, IconButton, Card, Text, Button } from 'react-native-paper';
import { timeAgo } from '../../utils/timeFunctions';
import { auth } from '../../database/firebaseConfig';
import CommentCard from './CommentCard';

const { height } = Dimensions.get('window');

const PostCard = ({ imageUrl, name, cardContent, created, creator }) => {
  const user = auth.currentUser;
  const [isExpanded, setIsExpanded] = useState(false);
  const initialCardHeight = height * 0.2; // Adjusted initial height
  const expandedCardHeight = height * 0.76; // Adjusted expanded height
  const animatedHeight = new Animated.Value(initialCardHeight);
  const animatedElevation = new Animated.Value(1);

  // useEffect(() => {
  //   const initialComments = ['Initial comment'];
  //   const additionalComments = [
  //     'Comment 1',
  //     'Comment 2',
  //     'Comment 3',
  //     'Comment 4',
  //     'Comment 5',
  //   ];
  //   setComments(
  //     isExpanded ? [...initialComments, ...additionalComments] : initialComments
  //   );
  // }, [isExpanded]);

  const comments = [
    'This is Comment 1',
    'This is Comment 2',
    'This is Comment 3',
    'This is Comment 4',
    'This is Comment 5',
  ];

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (isExpanded) {
      Animated.spring(animatedHeight, {
        toValue: expandedCardHeight,
        useNativeDriver: false,
      }).start();
      Animated.spring(animatedElevation, {
        toValue: 10,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(animatedHeight, {
        toValue: height * 0.3,
        useNativeDriver: false,
      }).start();
      Animated.spring(animatedElevation, {
        toValue: 1,
        useNativeDriver: false,
      }).start();
    }
  }, [isExpanded]);

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
    <Animated.View
      style={[
        styles.container,
        { height: animatedHeight, elevation: animatedElevation },
      ]}
    >
      <Card mode='elevated' style={styles.card}>
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

        <View style={styles.actionsContainer}>
          <Button mode='default' icon='heart-outline'>
            0
          </Button>
          <Button
            onPress={toggleExpand}
            mode='default'
            icon='comment-text-outline'
          >
            0
          </Button>
          <Button mode='default' icon='share-outline'>
            0
          </Button>
        </View>
        <View
          style={{
            marginHorizontal: 18,
          }}
        >
          {comments.map((comment) => (
            <CommentCard key={comment} comment={comment} name={'Pawan Dai'} />
          ))}
        </View>
      </Card>
      {/* {isExpanded && (
        <ScrollView style={styles.commentContainer}>
          {comments.map((comment, index) => (
            <View key={index} style={styles.commentBox}>
              <Text>{comment}</Text>
            </View>
          ))}
        </ScrollView>
      )} */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  card: {
    flex: 1,
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

export default PostCard;
