import { NavLink, Navigate } from "react-router-dom";
// Types
import { IChat } from "../../model/chat";
// Context
import { useAuth } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";
import { useMessage } from "../../context/MessageContext";
// Util
import { getChatInfo } from "../../utils/getChatInfo";
import url from "../../utils/url";
import getUnreadMessage from "../../utils/getUnreadMessage";

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

  let unreadMsg = getUnreadMessage(chat, user);

  return (
    <NavLink
      to={"/chats/" + chat.id}
      className={`chat-item flex justify-start items-center gap-4 my-2 py-3 px-1 rounded-md hover:bg-white/5`}
      onClick={() => setIsChatsOpen(!isChatsOpen)}
    >
      <img
        src={url + getChatInfo(chat, user).image}
        className='h-8 w-8 rounded-full'
      />
      <main className='w-4/5 text-ellipsis overflow-hidden'>
        <h3 className=' overflow-hidden flex justify-between items-baseline'>
          <span className='whitespace-nowrap text-sm font-bold w-4/5 text-ellipsis'>
            {getChatInfo(chat, user).name}
          </span>
          <div className='flex justify-center items-'>
            {unreadMsg > 0 && (
              <small className='bg-success rounded-full p-2 w-4 h-4 text-[0.6rem] flex justify-center items-center'>
                {unreadMsg}
              </small>
            )}
          </div>
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
