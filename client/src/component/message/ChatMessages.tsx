import { useState, useEffect } from "react";
// Types
import { IMessage } from "../../model/message";
// Components
import MessageBubble from "./MessageBubble";

type Props = {
  chatId: string;
};

const ChatMessages = ({ chatId }: Props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [messages, setMessages] = useState<IMessage[] | null>(null);

  const getChatMessages = async (chatId: string) => {
    try {
      const response = await fetch("/api/v1/message/" + chatId);
      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        setError(true);
        alert(data?.msg || "Couldn't get chat messages");
        return;
      }

      setLoading(false);
      setMessages(data);
    } catch (err) {
      setLoading(false);
      setError(true);
      console.error(err);
    }
  };

  useEffect(() => {
    getChatMessages(chatId);
  }, [chatId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  if (messages && messages.length > 0) {
    return (
      <div className='h-full w-full'>
        {messages.map((message) => {
          return <MessageBubble key={message.id} message={message} />;
        })}
      </div>
    );
  }

  return <></>;
};

export default ChatMessages;
