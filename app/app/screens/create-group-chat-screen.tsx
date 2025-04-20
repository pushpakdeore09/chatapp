import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import { ArrowLeft, UserPlus } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useChat } from "../context/chat-context";

const CreateGroupChatScreen = () => {
  const navigation = useNavigation();
  const { filteredChats } = useChat();

  const renderItem = ({ item }: any) => (
    <TouchableOpacity className="flex-row items-center px-4 py-3">
      <Image
        source={{ uri: item.avatar }}
        className="w-16 h-16 rounded-full mr-4"
      />
      <View>
        <Text className="text-lg font-semibold text-gray-900">{item.user}</Text>
        <Text className="text-sm text-gray-500">{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      
      <View className="w-full bg-blue-500 pb-4">
        <View className="flex-row items-center px-4 pt-6">
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color="white" />
          </Pressable>
          <Text className="text-2xl font-semibold ml-4 text-white">
            Create Group
          </Text>
        </View>
      </View>

      <Pressable onPress={() => navigation.navigate("CreateNewGroup" as never)}>
      <View className="flex-row w-full px-4 py-6">
        <UserPlus size={24} color="black" />
        <Text className="text-xl font-semibold px-4">New Group</Text>
      </View>
      </Pressable>

      
      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }} 
      />
    </View>
  );
};

export default CreateGroupChatScreen;

