import  Message  from "./Message";
import  User  from "./User";

export default interface Chat {
    id: string;
    chatName: string;
    isGroupChat: boolean;
    users: User[];
    latestMessage: Message;
    groupAdmin: User;
    createdAt: string;
    updatedAt: string;
  }
  