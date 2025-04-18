import React, { createContext, useState, useContext } from "react";

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
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const mockChats: Chat[] = [
  {
    id: "1",
    user: "Alice",
    lastMessage: "Hey, how are you?",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
  },
  {
    id: "2",
    user: "Bob",
    lastMessage: "Let’s catch up later!",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: "3",
    user: "Charlie",
    lastMessage: "What’s up?",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [search, setSearch] = useState("");
  const filteredChats = mockChats.filter((chat) =>
    chat.user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ChatContext.Provider value={{ chats: mockChats, filteredChats, setSearch }}>
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
