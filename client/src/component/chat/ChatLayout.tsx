import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// Components
import MessageInput from "../message/MessageInput";
import ChatMessages from "../message/ChatMessages";
// Hook
import useTitle from "../../hooks/useTitle";
import { useChatOpen } from "../../pages/Chat";
// Component
import ChatHeader from "./ChatHeader";
// Context
import { useChat } from "../../context/ChatContext";
import { useSocket } from "../../context/SocketContext";
// Types
import { IChat } from "../../model/chat";

const SingleChat = () => {
  const { id: chatId } = useParams();
  useTitle("Chat");
  const navigate = useNavigate();

  if (chatId == undefined) {
    return <Navigate to='/' />;
  }

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { setIsChatsOpen } = useChatOpen(); // Checks if all chats is open specifically for mobile device
  const { currentChat, setCurrentChat } = useChat(); // Sets the current chat in the chat context
  const { socket } = useSocket();

  const getSingleChat = async (chatId: string) => {
    try {
      const response = await fetch("/api/v1/chat/" + chatId);
      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        setError(true);
        navigate("/chats");
        return;
      }

      setLoading(false);
      setCurrentChat(data);
    } catch (err) {
      setLoading(false);
      setError(true);
      console.error(err);
    }
  };

  const [isEditing, setIsEditing] = useState({
    editing: false,
    message: { id: 0, text: "", sender: 0 },
  }); // To track message editing
  const [text, setText] = useState(""); // To track input for messages

  useEffect(() => {
    if (currentChat) {
      // Leave Old Chat
      socket?.emit("leave-chat", currentChat.id);
    }
    getSingleChat(chatId).then(() => {
      // Join Current Chat
      socket?.emit("join-chat", chatId);
    });
    setText("");
  }, [chatId]);

  useEffect(() => {
    if (currentChat) {
      // Update local storage copy of the chat when
      // A single chat component is mounted
      let chats = localStorage.getItem("chats");
      if (chats) {
        let result: IChat[] = JSON.parse(chats);

        let updatedChats = result.filter((chat) => chat.id !== currentChat.id);

        updatedChats = [currentChat, ...updatedChats];

        localStorage.setItem("chats", JSON.stringify(updatedChats));
      }
    }
  }, [currentChat]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  if (!currentChat) {
    getSingleChat(chatId);
    return <div>Error...</div>;
  }

  return (
    <section className='flex flex-col justify-between h-screen gap-2 py-1'>
      <div className='basis-1/12 p-2 flex justify-start items-center gap-4'>
        <ChatHeader chat={currentChat} setIsChatsOpen={setIsChatsOpen} />
      </div>
      <div className='basis-5/6 h-full overflow-y-scroll no-scrollbar sm:px-3'>
        <ChatMessages
          chat={currentChat}
          setText={setText}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      </div>
      <div className='mx-auto w-full basis-1/12'>
        <MessageInput
          chatId={chatId}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          text={text}
          setText={setText}
        />
      </div>
    </section>
  );
};

export default SingleChat;
