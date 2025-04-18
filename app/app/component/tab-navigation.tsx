import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ChatScreen from '../screens/chat-screen';
import ProfileScreen from '../screens/profile-screen';

const Tab = createBottomTabNavigator();

const ChatTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string;

          if (route.name === 'Chats') iconName = 'chat';
          else if (route.name === 'Calls') iconName = 'call';
          else iconName = 'contacts';

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Chats" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default ChatTabNavigator;
