import Home from '../components/shared/Home';
import Tools from '../components/shared/Tools';
import Profile from '../components/shared/Profile';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NewPost from '../components/ui/NewPost';

const Tab = createMaterialBottomTabNavigator();

export default function HomeNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='home' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='Posts'
        component={NewPost}
        options={{
          tabBarLabel: 'Posts',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='post-outline'
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Tools'
        component={Tools}
        options={{
          tabBarLabel: 'Tools',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='cogs' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='account' color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
