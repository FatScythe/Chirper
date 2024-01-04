// Component
import ChatItem from "./ChatItem";
// Context
import { useChat } from "../../context/ChatContext";

const AllChats = () => {
  const { loading, myChats } = useChat();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!myChats && !loading) {
    return <div>Error...</div>;
  }
  if (myChats && myChats.nb < 1) {
    <div>You have no chats yet</div>;
  }

  if (!myChats) {
    return <div>Error...</div>;
  }

  return (
    <div>
      <div className='overflow-x-hidden overflow-y-scroll h-screen scroll-m-0 no-scrollbar'>
        {myChats.chats.map((chat) => (
          <ChatItem chat={chat} key={chat.id} />
        ))}
      </div>
    </div>
  );
};

export default AllChats;
