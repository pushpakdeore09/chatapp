import {
  Pressable,
  Text,
  TextInput,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { ArrowLeft, X } from "lucide-react-native"; 
import { useNavigation } from "@react-navigation/native";
import { useChat } from "../context/chat-context";

interface User {
  id: string;
  user: string;
  avatar: string;
  lastMessage?: string;
}

const CreateNewGroupScreen = () => {
  const navigation = useNavigation();
  const { filteredChats } = useChat();
  const [groupName, setGroupName] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedUsers, setSelectedUsers] = React.useState<User[]>([]);

  const searchedUsers = filteredChats.filter((chat) =>
    chat.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectUser = (user: User) => {
    const alreadySelected = selectedUsers.find((u) => u.id === user.id);
    if (!alreadySelected) {
      setSelectedUsers([...selectedUsers, user]);
    }
    setSearchQuery("");
  };

  const handleRemoveUser = (userId: string) => {
    setSelectedUsers(selectedUsers.filter((u) => u.id !== userId));
  };

  const handleCreateGroup = () => {
    if (!groupName.trim()) {
      alert("Please enter a group name");
      return;
    }

    if (selectedUsers.length === 0) {
      alert("Please select at least one user");
      return;
    }

    console.log("✅ Group Created!", { name: groupName, members: selectedUsers });
    navigation.navigate("ChatScreen" as never);
    setGroupName("");
    setSelectedUsers([]);
    setSearchQuery("");

    alert("Group created!");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="w-full bg-blue-500 pb-4">
          <View className="flex-row items-center px-4 pt-6">
            <Pressable onPress={() => navigation.goBack()}>
              <ArrowLeft size={24} color="white" />
            </Pressable>
            <Text className="text-2xl font-semibold ml-4 text-white">New Group</Text>
          </View>
        </View>

        <View className="px-4 mt-6">
          <TextInput
            value={groupName}
            onChangeText={setGroupName}
            placeholder="Enter group name"
            style={{ fontSize: 16 }}
            className="border border-gray-300 px-4 py-5 text-base text-gray-900 rounded-full mb-4"
          />

          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search users..."
            style={{ fontSize: 16 }}
            className="border border-gray-300 px-4 py-3 text-base text-gray-900 rounded-full"
          />

          {selectedUsers.length > 0 && (
            <View className="flex-row flex-wrap mt-4 mb-2">
              {selectedUsers.map((user) => (
                <View
                  key={user.id}
                  className="flex-row items-center mr-2 mb-2 bg-gray-200 px-3 py-2 rounded-full"
                >
                  <Image
                    source={{ uri: user.avatar }}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <Text className="text-sm font-medium mr-1">{user.user}</Text>
                  <TouchableOpacity onPress={() => handleRemoveUser(user.id)}>
                    <Text className="text-sm text-gray-600">✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {searchQuery.length > 0 && (
            <FlatList
              data={searchedUsers}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelectUser(item)}
                  className="flex-row items-center py-3 px-2 bg-gray-100 rounded-xl mb-2 mt-2"
                  style={{ elevation: 1 }}
                >
                  <Image
                    source={{ uri: item.avatar }}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <View>
                    <Text className="text-lg font-semibold text-gray-800">{item.user}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}

          {groupName.trim() !== "" && selectedUsers.length > 0 && (
            <TouchableOpacity
              onPress={handleCreateGroup}
              className="bg-blue-500 py-4 mt-6 rounded-full items-center justify-center"
            >
              <Text className="text-white text-lg font-semibold">Create Group</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreateNewGroupScreen;
