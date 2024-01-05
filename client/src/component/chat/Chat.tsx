import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// Components
import MessageInput from "../message/MessageInput";
// Hook
import useTitle from "../../hooks/useTitle";
import { useChatOpen } from "../../pages/Chat";

const SingleChat = () => {
  const { id: chatId } = useParams();
  useTitle("Chat");

  if (chatId == undefined) {
    return <Navigate to='/' />;
  }

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [chat, setChat] = useState(null);

  const { setIsChatsOpen } = useChatOpen();
  const navigate = useNavigate();

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
      return;
    }
  };

  useEffect(() => {
    getSingleChat(chatId);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  console.log(chat);

  return (
    <section className='flex flex-col justify-between h-screen gap-2 py-1'>
      <div
        className='border border-red-200 basis-1/12'
        onClick={() => {
          navigate("/chats");
          setIsChatsOpen(true);
        }}
      >
        {/* <ChatHeader /> */} Header
      </div>
      <div className='border border-red-200 basis-5/6'>
        {/* <Messages /> */} Messages
      </div>
      <div className='mx-auto w-full basis-1/12'>
        <MessageInput />
      </div>
    </section>
  );
};

export default SingleChat;
