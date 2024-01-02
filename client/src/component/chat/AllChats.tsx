// Component
import SingleChat from "./SingleChat";
// Context
import { useChat } from "../../context/ChatContext";

const AllChats = () => {
  const { loading, getChats, myChats } = useChat();

  //   getChats();
  //   console.log(loading, myChats);

  if (loading) {
    return <div>loading...</div>;
  }

  if (!myChats && !loading) {
    <div>Error...</div>;
  }
  if (myChats && myChats?.nb < 1) {
    <div>You have no chats yet</div>;
  }

  console.log(myChats?.chats);

  return (
    <div>
      <div className='overflow-x-hidden overflow-y-scroll h-screen scroll-m-0'>
        <SingleChat />
      </div>
    </div>
  );
};

export default AllChats;
