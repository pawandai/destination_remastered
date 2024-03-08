import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { db } from '../../database/firebaseConfig';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import PostCard from '../ui/PostCard';

const Home = () => {
  const postRef = query(
    collection(db, `posts`),
    orderBy('created', 'desc'),
    limit(10)
  );
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  async function fetchPosts() {
    try {
      const fetchedPosts = await getDocs(postRef);
      let tempPosts = [];
      fetchedPosts.forEach((post) => {
        tempPosts.push({ id: post.id, ...post.data() });
      });
      setPosts(tempPosts);
    } catch (error) {
      console.log('Fetching error: ', error);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ marginVertical: 40 }}>
          <View>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} fetchPosts={fetchPosts} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
