import { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  LayoutAnimation,
  ScrollView,
} from 'react-native';
import {
  Avatar,
  IconButton,
  Card,
  Text,
  Button,
  TextInput,
} from 'react-native-paper';
import { timeAgo } from '../../utils/timeFunctions';
import { auth, db } from '../../database/firebaseConfig';
import CommentCard from './CommentCard';
import {
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  deleteDoc,
  arrayRemove,
} from 'firebase/firestore';

const { height } = Dimensions.get('window');

const PostCard = ({ post, fetchPosts }) => {
  const user = auth.currentUser;

  // State variables goes here
  const [isExpanded, setIsExpanded] = useState(false);
  const [comment, setComment] = useState('');
  const [commentsArray, setCommentsArray] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [numberOfLikes, setNumberOfLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  // for expanding animations, calculating the height window
  const initialCardHeight = height * 0.2; // Adjusted initial height
  const expandedCardHeight = height * 0.76; // Adjusted expanded height
  const animatedHeight = new Animated.Value(initialCardHeight);
  const animatedElevation = new Animated.Value(1);

  useEffect(() => {
    // Fetch comments from Firestore when component mounts
    fetchComments();
    fetchPosts();
  }, []);

  // Fetch comments from Firestore when component mounts
  const fetchComments = async () => {
    try {
      const postDoc = await getDoc(doc(db, 'posts', post.id));
      if (postDoc.exists()) {
        const postData = postDoc.data();
        setCommentsArray(postData.comments || []); // Set comments array, if available
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  // Delete post from the firestore database
  const deletePost = async () => {
    try {
      const postRef = doc(db, 'posts', post.id);
      await deleteDoc(postRef).then(() => {
        setShowConfirmation(false);
        console.log('Post deleted successfully');
        fetchPosts();
      });
    } catch (error) {
      console.log('Error while deleting post: ', error);
    }
  };

  // Edit posts
  const editPost = async () => {
    try {
      const postRef = doc(db, 'posts', post.id);
      await updateDoc(postRef, {
        ...post,
        content: newPostContent,
        edited: true,
      }).then(() => {
        fetchPosts();
        setShowConfirmation(false);
        setIsEditing(false);
        console.log('Post updated successfully !');
      });
    } catch (error) {
      console.log('Error while editing post: ', error);
    }
  };

  // Like Posts
  const likePosts = async () => {
    const currentLikeStatus = !post.likes.includes(user.uid);
    updateDoc(doc(db, 'posts', post.id), {
      likes: currentLikeStatus ? arrayUnion(user.uid) : arrayRemove(user.uid),
    }).then(() => fetchPosts());
  };

  // logic for posting comments to the respective posts goes here
  const postComment = async () => {
    if (comment.trim() === '') return; // Don't post empty comments

    try {
      const commentData = {
        id: Math.random() * 10000000000,
        comment: comment,
        creator: user.uid,
        creatorName: user.displayName,
        profilePicture: user.photoURL,
        createdAt: new Date(),
        edited: false,
      };

      await updateDoc(doc(db, 'posts', post.id), {
        comments: arrayUnion(commentData),
      });

      setComment('');
      // After posting comment, fetch comments again to update the UI with latest data
      fetchComments();
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
    setComment('');
  };

  // Animation related functions
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
        toValue: initialCardHeight,
        useNativeDriver: false,
      }).start();
      Animated.spring(animatedElevation, {
        toValue: 1,
        useNativeDriver: false,
      }).start();
    }
  }, [isExpanded]);

  const LeftContent = (props) => (
    <Avatar.Image {...props} source={{ uri: post.profilePicture }} />
  );

  const UserRightContent = (props) => (
    <View
      style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
    >
      <IconButton
        {...props}
        icon='pencil-outline'
        iconColor='green'
        onPress={() => {
          setShowConfirmation(true);
          setIsEditing(true);
          setNewPostContent(post.content);
        }}
      />
      <IconButton
        {...props}
        icon='trash-can-outline'
        iconColor='red'
        onPress={() => {
          setShowConfirmation(true);
          setIsEditing(false);
        }}
      />
    </View>
  );

  const OthersRightContent = (props) => (
    <IconButton {...props} icon='bookmark-outline' />
  );

  // Life span of a post
  const age = timeAgo(post.created.seconds);

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
          title={post.creatorName}
          subtitle={`${age} ${post.edited ? '(edited)' : ''}`}
          subtitleStyle={{ color: 'grey' }}
          left={LeftContent}
          right={
            user.uid === post.creator ? UserRightContent : OthersRightContent
          }
        />
        <Card.Content>
          {!showConfirmation ? (
            <Text variant='bodyLarge'>{post.content}</Text>
          ) : isEditing ? (
            <TextInput
              placeholder='Edit Post'
              value={newPostContent}
              style={{
                position: 'absolute',
                top: -60,
                width: '112%',
                display: 'flex',
                marginHorizontal: 'auto',
                justifyContent: 'center',
              }}
              multiline={true}
              numberOfLines={3}
              scrollEnabled={true}
              onChangeText={(text) => setNewPostContent(text)}
            />
          ) : (
            <Text>Are you sure you want to delete this post?</Text>
          )}
          {showConfirmation && isEditing ? (
            <View style={{ height: 20 }}></View>
          ) : (
            ''
          )}
        </Card.Content>

        {!showConfirmation ? (
          <View style={styles.actionsContainer}>
            <Button
              mode='default'
              icon={post.likes.includes(user.uid) ? 'heart' : 'heart-outline'}
              onPress={likePosts}
            >
              {post.likes.length ? post.likes.length : 0}
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
        ) : (
          <View style={styles.actionsContainer}>
            <Button
              mode='default'
              icon='window-close'
              onPress={() => {
                setShowConfirmation(false);
              }}
            >
              Cancel
            </Button>
            {!isEditing ? (
              <Button
                mode='default'
                icon='check'
                labelStyle={{ color: 'red' }}
                onPress={deletePost}
              >
                Delete
              </Button>
            ) : (
              <Button
                mode='default'
                icon='check'
                labelStyle={{ color: 'green' }}
                onPress={editPost}
              >
                Edit
              </Button>
            )}
          </View>
        )}

        <View
          style={{
            marginHorizontal: 18,
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}
        >
          {commentsArray.map((comments, index) => (
            <CommentCard
              key={index}
              post={post}
              index={index}
              comments={comments}
              setCommentsArray={setCommentsArray}
              commentsArray={commentsArray}
              fetchComments={fetchComments}
            />
          ))}
        </View>
        <View
          style={{
            marginHorizontal: 18,
            position: 'absolute',
            top: 475,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TextInput
            style={{ flex: 1, paddingVertical: -8 }}
            type='text'
            placeholder='Comment'
            mode='outlined'
            value={comment}
            onChangeText={(text) => setComment(text)}
          />
          <IconButton
            onPress={postComment}
            mode='contained-tonal'
            icon='send-outline'
          />
        </View>
      </Card>
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
    position: 'relative',
    padding: 1,
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
