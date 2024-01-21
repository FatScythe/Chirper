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
    let localChats = localStorage.getItem("chats");
    if (localChats) {
      /*
        If local storage chats exist and the length is not equal to the database chats,
        Update the local storage
      */
      if (myChats && myChats.chats.length !== JSON.parse(localChats).length) {
        localStorage.setItem("chats", JSON.stringify(myChats.chats));
      }
    } else {
      // Makes a copy of all the chat on the local storage if it doesn't already exist
      // To-do: Find specific difference and update local storage, instead of updating all
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
