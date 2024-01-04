import { IUser } from "./user";

type chatType = "private" | "group";

export interface IChat {
  id: number;
  name?: string | null;
  chatType: chatType | null;
  users: IUser[];
  members: number[];
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
