import { Navigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// Components
import MessageInput from "../message/MessageInput";
import ChatMessages from "../message/ChatMessages";
// Hook
import useTitle from "../../hooks/useTitle";
import { useChatOpen } from "../../pages/Chat";
// Types
import { IChat } from "../../model/chat";
import ChatHeader from "./ChatHeader";

const SingleChat = () => {
  const { id: chatId } = useParams();
  useTitle("Chat");

  if (chatId == undefined) {
    return <Navigate to='/' />;
  }

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [chat, setChat] = useState<IChat | null>(null);

  const { setIsChatsOpen } = useChatOpen();

  const getSingleChat = async (chatId: string) => {
    try {
      const response = await fetch("/api/v1/chat/" + chatId);
      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        setError(true);
        alert(data?.msg || "Couldn't get chat info");
        return;
      }

      setLoading(false);
      setChat(data);
    } catch (err) {
      setLoading(false);
      setError(true);
      console.error(err);
    }
  };

  useEffect(() => {
    getSingleChat(chatId);
  }, [chatId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  if (!chat) {
    return <div>Error...</div>;
  }

  return (
    <section className='flex flex-col justify-between h-screen gap-2 py-1'>
      <div className='basis-1/12 p-2 flex justify-start items-center gap-4'>
        <ChatHeader chat={chat} setIsChatsOpen={setIsChatsOpen} />
      </div>
      <div className='basis-5/6'>
        <ChatMessages chat={chat} />
      </div>
      <div className='mx-auto w-full basis-1/12'>
        <MessageInput chatId={chatId} />
      </div>
    </section>
  );
};

export default SingleChat;
