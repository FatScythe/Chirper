import { NavLink, Navigate } from "react-router-dom";
// Types
import { IChat } from "../../model/chat";
// Image
import groupAvatar from "../../assets/avatars.png";
// Context
import { useAuth } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";
import { useMessage } from "../../context/MessageContext";
// Util
import { getChatInfo } from "../../utils/getChatInfo";
import url from "../../utils/url";

type Props = {
  chat: IChat;
  isChatsOpen: boolean;
  setIsChatsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatItem = (props: Props) => {
  const { chat, isChatsOpen, setIsChatsOpen } = props;
  const { user } = useAuth();
  const { currentChat } = useChat();
  const { memberTyping } = useMessage();

  if (!user) {
    return <Navigate to='/' />;
  }

  return (
    <NavLink
      to={"/chats/" + chat.id}
      className={`chat-item flex justify-start items-center gap-4 my-2 sm:p-2 rounded-md hover:bg-white/5`}
      onClick={() => setIsChatsOpen(!isChatsOpen)}
    >
      <img
        src={
          chat.chatType === "private"
            ? url + getChatInfo(chat, user).image
            : groupAvatar
        }
        className='h-8 w-8 rounded-full'
      />
      <main className='w-4/5 text-ellipsis overflow-hidden'>
        <h3 className='whitespace-nowrap text-sm font-bold w-4/5 overflow-hidden text-ellipsis'>
          {getChatInfo(chat, user).name}
        </h3>
        {currentChat?.id === chat.id && memberTyping ? (
          <small className='text-success font-semibold'>{memberTyping}</small>
        ) : (
          <small className='font-thin text-slate-300'>
            {getChatInfo(chat, user).lastmessage}
          </small>
        )}
      </main>
    </NavLink>
  );
};

export default ChatItem;
