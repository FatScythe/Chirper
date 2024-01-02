type chatType = "private" | "group";

export interface IChat {
  name?: string | null;
  chatType: chatType | null;
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
