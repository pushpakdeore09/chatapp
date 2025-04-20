import { Pressable, Text, View, Image } from "react-native";
import React from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { ArrowLeft } from "lucide-react-native";

type ChatScreenRouteProp = RouteProp<RootStackParamList, "Chat">;
const Chat = () => {
  const navigation = useNavigation();
  const route = useRoute<ChatScreenRouteProp>();
  const { selectedChat } = route.params;

  return (
    <>
      <View className="flex-1 bg-white">
        <View className="w-full bg-blue-500 pb-4">
          <View className="flex-row items-center px-4 pt-6">
            <Pressable onPress={() => navigation.goBack()}>
              <ArrowLeft size={24} color="white" />
            </Pressable>

            <Image
              source={{ uri: selectedChat.avatar }} 
              className="w-10 h-10 rounded-full ml-4" 
            />

            <Text className="text-2xl font-semibold ml-4 text-white">
              {selectedChat.user}
            </Text>
          </View>
        </View>

        <Text>Last Message: {selectedChat.lastMessage}</Text>
      </View>
    </>
  );
};

export default Chat;
