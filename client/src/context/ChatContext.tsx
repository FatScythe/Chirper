import { createContext, useContext, useState, useEffect } from "react";
import { ChatContextType, IChat } from "../model/chat";

const ChatContext = createContext<ChatContextType>({
  loading: false,
  currentChat: null,
  myChats: null,
  getChats: async () => {},
  deleteChat: async () => {},
  setCurrentChat: () => null,
});

const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [currentChat, setCurrentChat] = useState<IChat | null>(null); // Tracks the current chat user selected
  const [myChats, setMyChats] = useState<{ nb: number; chats: IChat[] } | null>(
    null
  ); // Tracks all users chats

  const getChats = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/v1/chat");
      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        alert(data?.msg || "Couldn't get chats");
        return;
      }
      setLoading(false);
      setMyChats(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  const deleteChat = async (chatId: number) => {
    try {
      const response = await fetch("/api/v1/chat/" + chatId, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok) {
        alert(data?.msg || "Couldn't delete chat");
        return;
      }

      alert(data.msg);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        currentChat,
        myChats,
        getChats,
        deleteChat,
        setCurrentChat,
        loading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;

export const useChat = () => useContext(ChatContext);
