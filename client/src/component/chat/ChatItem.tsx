import { Link, Navigate } from "react-router-dom";
// Types
import { IChat } from "../../model/chat";
import { IUser } from "../../model/user";
// Image
import image from "../../assets/react.svg";
// Context
import { useAuth } from "../../context/AuthContext";

type Props = {
  chat: IChat;
};

const getChatInfo = (chat: IChat, user: IUser) => {
  /*
    This function gets a chat and a user and returns a name and image for the chat
    It check if the chat is a private / group chat. 
    It also checks If it's a private chat,it also checks if it belong to the current user 
   */
  if (!user) {
    return { name: chat.name, image: "" };
  }
  if (chat.chatType === "private") {
    if (chat.createdBy === user.userId && chat.members.length === 1) {
      const currentUser = chat.users.filter(
        (chatUser) => chatUser.id === user.userId
      )[0];

      return {
        name: chat?.name || "Me(You)",
        image: currentUser.avatar,
      };
    } else {
      const chatPartner = chat.users.filter(
        (chatUser) => chatUser.id !== user.userId
      )[0];

      return {
        name: chatPartner.name,
        image: chatPartner.avatar,
      };
    }
  } else {
    return {
      name: chat?.name || "Group " + chat.id,
    };
  }
};

const ChatItem = (props: Props) => {
  const { chat } = props;
  const { user } = useAuth();
  if (!user) {
    return <Navigate to='/' />;
  }

  return (
    <Link
      to={"/chats/" + chat.id}
      className='flex justify-start items-center gap-4 my-2 p-2 rounded-md hover:bg-white/5'
    >
      <img
        src={
          getChatInfo(chat, user).image
            ? "http://localhost:5000/" + getChatInfo(chat, user).image
            : image
        }
        className='h-8 w-8 rounded-full'
      />
      <main className='w-4/5 text-ellipsis overflow-hidden'>
        <h3 className='whitespace-nowrap text-sm font-bold w-4/5 overflow-hidden text-ellipsis'>
          {getChatInfo(chat, user).name}
        </h3>
        <small className='font-thin text-slate-300'>last message</small>
      </main>
    </Link>
  );
};

export default ChatItem;
