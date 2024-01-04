import { Navigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const SingleChat = () => {
  const { id: chatId } = useParams();

  if (chatId == undefined) {
    return <Navigate to='/' />;
  }

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [chat, setChat] = useState(null);

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

  return <section>A Single Chat</section>;
};

export default SingleChat;
