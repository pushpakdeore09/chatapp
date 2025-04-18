import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "../screens/profile-screen";
import SettingsScreen from "../screens/settings-screen";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialIcons";
import { View, Text, Image, Pressable } from "react-native";
import ChatTabNavigator from "./tab-navigation";

export type DrawerParamList = {
  ChatScreen: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const CustomDrawerContent = (props: any) => {
  return (
    <>
      <DrawerContentScrollView {...props} className="bg-white">
        {/* Drawer Header */}
        <View className="flex-row items-center justify-cente h-24 ml-4">
          <Text className="text-2xl font-bold text-center py-4">Chatrr</Text>
        </View>
        <Pressable
          onPress={() => props.navigation.navigate("Profile")}
          className="flex-row items-center px-4 py-6 bg-blue-500 rounded-2xl mb-4"
        >
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/women/10.jpg" }}
            className="w-16 h-16 rounded-full mb-2"
          />
          <View className="ml-4">
            <Text className="text-lg font-bold text-white">John Doe</Text>
            <Text className="text-sm text-white">johndoe@example.com</Text>
          </View>
        </Pressable>

        {/* Drawer Items */}
        <DrawerItem
          label="Home"
          labelStyle={{ fontSize: 18, color: "black" }}
          icon={({ size }) => <Icon name="chat" size={size} color="black" />}
          onPress={() => props.navigation.navigate("ChatScreen")}
        />
        <DrawerItem
          label="Profile"
          labelStyle={{ fontSize: 18, color: "black" }}
          icon={({ size }) => <Icon name="person" size={size} color="black" />}
          onPress={() => props.navigation.navigate("Profile")}
        />
        <DrawerItem
          label="Settings"
          labelStyle={{ fontSize: 18, color: "black" }}
          icon={({ size }) => (
            <Icon name="settings" size={size} color="black" />
          )}
          onPress={() => props.navigation.navigate("Settings")}
        />
      </DrawerContentScrollView>
      <View className="border-t border-gray-200 p-4">
        <DrawerItem
          label="Logout"
          labelStyle={{ fontSize: 18, color: "black" }}
          icon={({ size }) => <Icon name="logout" size={size} color="black" />}
          onPress={() => {
            // handle logout logic here
            console.log("Logging out...");
          }}
        />
      </View>
    </>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="ChatScreen"
        component={ChatTabNavigator}
        options={{ title: "Home" }}
      />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
