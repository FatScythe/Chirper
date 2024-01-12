import { IMessage } from "./message";
import { IUser } from "./user";

export type chatType = "private" | "group";

export interface IChat {
  id: number;
  name: string | null;
  chatType: chatType | null;
  users: IUser[];
  members: number[];
  messages?: IMessage[];
  createdBy: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export type ChatContextType = {
  loading: Boolean;
  currentChat: IChat | null;
  myChats: { nb: number; chats: IChat[] } | null;
  getChats: () => Promise<void>;
  deleteChat: (chatId: number) => Promise<void>;
  changeCurrentChat: (chat: IChat) => void;
};
