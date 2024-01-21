import { useEffect } from "react";
// Component
import ChatItem from "./ChatItem";
// Context
import { useChat } from "../../context/ChatContext";
// Hook
import useTitle from "../../hooks/useTitle";

type Props = {
  isChatsOpen: boolean;
  setIsChatsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AllChats = (props: Props) => {
  const { loading, myChats } = useChat();

  useTitle("All chats");

  useEffect(() => {
    if (!localStorage.getItem("chats")) {
      if (myChats) {
        localStorage.setItem("chats", JSON.stringify(myChats.chats));
      }
    }
  }, [myChats]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!myChats && !loading) {
    return <div>Error...</div>;
  }

  if (!myChats) {
    return <div>Error...</div>;
  }

  if (myChats && myChats.nb == 0) {
    return (
      <div className='text-center my-10 text-pretty text-lg'>
        You have no chats
      </div>
    );
  }

  return (
    <div>
      <div className='overflow-x-hidden overflow-y-scroll h-screen scroll-m-0 no-scrollbar'>
        {myChats.chats.map((chat) => (
          <ChatItem
            chat={chat}
            key={chat.id}
            isChatsOpen={props.isChatsOpen}
            setIsChatsOpen={props.setIsChatsOpen}
          />
        ))}
      </div>
    </div>
  );
};

export default AllChats;
