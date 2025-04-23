import Chat from "./models/Chat";

export type RootStackParamList = {
  Chat: { selectedChat: { user: string; lastMessage: string; avatar: string, messages: [] } };
};
