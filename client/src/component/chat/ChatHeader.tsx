import { useState } from "react";
// Icons
import { ChevronLeftIcon, OptionIcon } from "../icon";
// Context
import { useAuth } from "../../context/AuthContext";
// Type
import { IChat } from "../../model/chat";
// Utils
import { getChatInfo } from "../../utils/getChatInfo";
import url from "../../utils/url";

type Props = {
  chat: IChat;
  setIsChatsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatHeader = ({ chat, setIsChatsOpen }: Props) => {
  const { user } = useAuth();
  const [showOption, setShowOption] = useState(false);

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
          <small>
            {chat.chatType === "group"
              ? members.map((member) => member.name + "") + "..."
              : "last seen " +
                new Date(chat.updatedAt ? chat.updatedAt : "").toDateString()}
          </small>
        </div>
      </div>

      <div className='relative'>
        <button onClick={() => setShowOption(!showOption)}>
          <OptionIcon className='w-6 h-6' />
        </button>
        {showOption && <Option chat={chat} setShowOption={setShowOption} />}
      </div>
    </div>
  );
};

type optionType = {
  chat: IChat;
  setShowOption: React.Dispatch<React.SetStateAction<boolean>>;
};

const Option = ({ chat, setShowOption }: optionType) => {
  const { user } = useAuth();

  return (
    <div className=''>
      <div
        className='fixed z-20 bg-transparent top-0 right-0 left-0 bottom-0'
        onClick={() => setShowOption(false)}
      ></div>
      <div className='absolute z-20 top-6 -left-28 bg-white h-fit w-28 text-black'>
        <ul className='text-center flex flex-col justify-stretch gap-2 items-center'>
          <li className='w-full py-1 hover:bg-danger hover:text-white cursor-pointer duration-200'>
            {chat.createdBy === user?.userId ? "Delete Chat" : "Leave Chat"}
          </li>
          {chat.chatType === "group" && (
            <>
              <li className='w-full py-1 hover:bg-dark hover:text-white cursor-pointer duration-200'>
                Add to group
              </li>
              <li className='w-full py-1 hover:bg-danger hover:text-white cursor-pointer duration-200'>
                Leave group
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ChatHeader;
