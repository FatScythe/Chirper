// Icons
import { ChevronLeftIcon, OptionIcon } from "../icon";
// Context
import { useAuth } from "../../context/AuthContext";
// Type
import { IChat } from "../../model/chat";
// Util
import { getChatInfo } from "../../utils/getChatInfo";
import url from "../../utils/url";

type Props = {
  chat: IChat;
  setIsChatsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatHeader = ({ chat, setIsChatsOpen }: Props) => {
  const { user } = useAuth();

  if (!user) {
    return <></>;
  }

  const { name, members, image } = getChatInfo(chat, user);

  return (
    <div className='flex justify-between items-center w-full'>
      <div className='flex justify-start items-center gap-2'>
        <div className='flex justify-start items-center gap-2'>
          <button className='sm:hidden' onClick={() => setIsChatsOpen(true)}>
            <ChevronLeftIcon className='w-6 h-6' />
          </button>
          <img
            src={chat.chatType === "private" ? url + image : image || ""}
            className='rounded-full w-8 h-8 border object-contain'
            alt={name ? name : "profile picture"}
          />
        </div>

        <div>
          <h2 className='font-semibold'>{name}</h2>
          <small>{members.map((member) => member.name + ", ")} ...</small>
        </div>
      </div>

      <div>
        <OptionIcon className='w-6 h-6' />
      </div>
    </div>
  );
};

export default ChatHeader;
