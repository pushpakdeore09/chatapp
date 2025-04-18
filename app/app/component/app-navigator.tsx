import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../onboardingscreen';
import SignInScreen from '../(auth)/sign-in';
import DrawerNavigator from '../component/drawer-navigation'; 
import CreateGroupChatScreen from '../screens/create-group-chat-screen'; 

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="ChatScreen" component={DrawerNavigator} />
      <Stack.Screen name="CreateGroupChat" component={CreateGroupChatScreen} /> 
    </Stack.Navigator>
  );
};

export default AppNavigator;
