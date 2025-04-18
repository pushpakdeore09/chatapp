// screens/ChatScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { useChat } from "../context/chat-context";
import { Search } from "lucide-react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import CreateGroupChatScreen from "./create-group-chat-screen";

const ChatScreen: React.FC = () => {
  const { filteredChats, setSearch } = useChat();
  const [searchActive, setSearchActive] = useState(false);
  const [inputText, setInputText] = useState("");
  const navigation = useNavigation();

  const handleSearchPress = () => setSearchActive(true);
  const handleCancelSearch = () => {
    setSearchActive(false);
    setInputText("");
    setSearch("");
    Keyboard.dismiss();
  };

  const handleInputChange = (text: string) => {
    setInputText(text);
    setSearch(text);
  };

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
    <>
      <KeyboardAvoidingView
        className="flex-1 bg-white"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className="bg-blue-500 py-5 px-6 flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Icon name="bars" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold">Chatrr</Text>
          <TouchableOpacity onPress={handleSearchPress}>
            <Search color="white" size={24} />
          </TouchableOpacity>
        </View>

        {searchActive && (
          <View className="absolute top-16 left-0 right-0 z-20 p-4">
            <View className="bg-white flex-row items-center rounded-full px-4 shadow-lg">
              <TextInput
                autoFocus
                value={inputText}
                onChangeText={handleInputChange}
                placeholder="Search users..."
                placeholderTextColor="#9CA3AF"
                className="flex-1 py-4 text-lg text-gray-900"
              />
              <TouchableOpacity onPress={handleCancelSearch}>
                <Text className="text-blue-600 text-base font-medium">
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <FlatList
          data={filteredChats}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={
            searchActive
              ? { paddingBottom: 20, marginTop: 80 }
              : { paddingBottom: 20 }
          }
        />
        <View className="absolute bottom-12 right-8 z-30">
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateGroupChat" as never)}
            className="bg-blue-600 w-16 h-16 items-center justify-center rounded-full shadow-lg"
          >
            <Icon name="plus" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default ChatScreen;
