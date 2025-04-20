import  Chat  from "./Chat";
import  User  from "./User";

export default interface Message {
    sender: User;
    content: string;
    chat: Chat;
  }