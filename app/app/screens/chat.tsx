import {
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { ArrowLeft } from "lucide-react-native";
import { useChat } from "../context/chat-context";

type ChatScreenRouteProp = RouteProp<RootStackParamList, "Chat">;

const Chat = () => {
  const navigation = useNavigation();
  const route = useRoute<ChatScreenRouteProp>();
  const { selectedChat } = route.params;
  const [messages, setMessages] = useState<
    Array<{ text: string; sender: string }>
  >(selectedChat.messages || []);
  const [input, setInput] = useState("");
  const { loggedInUser } = useChat();

  const sendMessage = () => {
    if (!input.trim() || !loggedInUser) return;
    
    const newMsg = {
      id: Date.now(),
      text: input.trim(),
      sender: loggedInUser.firstName,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  return (
    <KeyboardAvoidingView className='flex-1'
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="flex-1 bg-white">
          {/* Header */}
          <View className="w-full bg-blue-500 pb-4">
            <View className="flex-row items-center px-4 pt-6">
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowLeft size={24} color="white" />
              </TouchableOpacity>

              <Image
                source={{ uri: selectedChat.avatar }}
                className="w-10 h-10 rounded-full ml-4"
              />

              <Text className="text-2xl font-semibold ml-4 text-white">
                {selectedChat.user}
              </Text>
            </View>
          </View>

          {/* Messages */}
          <ScrollView
            className="flex-1 px-4 py-2"
            keyboardShouldPersistTaps="handled"
          >
            {messages.map((msg, index) => {
              const isUser = msg.sender === loggedInUser?.firstName;
              return (
                <View
                  key={index}
                  className={`mb-2 max-w-[75%] p-3 rounded-lg ${
                    isUser ? "bg-blue-500 self-end" : "bg-gray-200 self-start"
                  }`}
                >
                  <Text className={isUser ? "text-white" : "text-black"}>
                    {msg.text}
                  </Text>
                </View>
              );
            })}
          </ScrollView>

          {/* Input Bar */}
          <View className="flex-row items-center p-4 border-t border-gray-200 bg-white">
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Type a message..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-4 mr-2"
            />

            <TouchableOpacity
              onPress={sendMessage}
              className="bg-blue-500 rounded-full px-4 py-4"
            >
              <Text className="text-white font-semibold">Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Chat;
