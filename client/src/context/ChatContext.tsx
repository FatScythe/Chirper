import { createContext, useContext, useState, useEffect } from "react";
import { ChatContextType, IChat } from "../model/chat";
import { useAuth } from "./AuthContext";

const ChatContext = createContext<ChatContextType>({
  loading: false,
  currentChat: null,
  myChats: null,
  getChats: async () => {},
  deleteChat: async () => {},
  setCurrentChat: () => null,
  leaveGroup: async () => {},
});

const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [currentChat, setCurrentChat] = useState<IChat | null>(null); // Tracks the current chat user selected
  const [myChats, setMyChats] = useState<{ nb: number; chats: IChat[] } | null>(
    null
  ); // Tracks all users chats

  const { user } = useAuth();

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

      if (currentChat && data.nb > 0) {
        const chats: IChat[] = data.chats;
        setCurrentChat(chats.filter((chat) => chat.id === currentChat.id)[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) getChats();
  }, [user]);

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

  const leaveGroup = async (chatId: number) => {
    try {
      const response = await fetch("/api/v1/chat/leave", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ chatId }),
      });
      const data = await response.json();

      if (!response.ok) {
        alert(data?.msg || "Couldn't leave group");
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
        leaveGroup,
        loading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;

export const useChat = () => useContext(ChatContext);
