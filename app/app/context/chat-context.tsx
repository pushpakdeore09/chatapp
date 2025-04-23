import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useState, useContext, useEffect } from "react";

type Chat = {
  id: string;
  user: string;
  lastMessage: string;
  avatar: string;
};

type ChatContextType = {
  chats: Chat[];
  filteredChats: Chat[];
  setSearch: (query: string) => void;
  loggedInUser: any;
  loading: boolean;

};


type JwtPayload = {
  exp: number;
  iat?: number;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const mockChats = [
  {
    id: "1",
    user: "Alice",
    lastMessage: "Hey, how are you?",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    messages: [
      { sender: "Alice", text: "Hey, how are you?" },
      { sender: "golu", text: "I'm good, thanks!" },
    ],
  },
  {
    id: "2",
    user: "Bob",
    lastMessage: "Let’s catch up later!",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    messages: [
      { sender: "Bob", text: "Let's catch up later!" },
      { sender: "golu", text: "Sure, talk soon!" },
    ],
  },
  {
    id: "3",
    user: "Charlie",
    lastMessage: "What’s up?",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    messages: [
      { sender: "Charlie", text: "What's up?" },
      { sender: "golu", text: "Not much, just relaxing." },
    ],
  },
];

const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const navigation  = useNavigation();
  const [search, setSearch] = useState("");
  const [loggedInUser, setLoggedInUser] = useState();
  const [loading, setLoading] = useState(true);

  const checkToken = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const decodedToken: JwtPayload = jwtDecode(token);
        const isExpired = decodedToken.exp * 1000 < Date.now();
        if (!isExpired) {
          router.push("/screens/chat-screen"); 
        } else {
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("user");
          router.push("/(auth)/sign-in");
        }
      } else {
        router.push("/(auth)/sign-in");
      }
    } catch (error) {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      router.push("/(auth)/sign-in");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);
  useEffect(() => {
    
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if(storedUser) {
          console.log(JSON.parse(storedUser));
          
          
          setLoggedInUser(JSON.parse(storedUser));
        } 
      } catch (error) {
        console.error("Error loading user from AsyncStorage:", error);
      }
    };
    fetchUser();
  }, [])
  const filteredChats = mockChats.filter((chat) =>
    chat.user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ChatContext.Provider value={{ chats: mockChats, filteredChats, setSearch, loggedInUser, loading }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within a ChatProvider");
  return context;
};

export default ChatProvider;
