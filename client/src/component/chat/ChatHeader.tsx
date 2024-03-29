import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Icons
import { ChevronLeftIcon, OptionIcon } from "../icon";
// Context
import { useAuth } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";
import { useMessage } from "../../context/MessageContext";
import { useSocket } from "../../context/SocketContext";
// Type
import { IChat } from "../../model/chat";
// Utils
import { getChatInfo } from "../../utils/getChatInfo";
import url from "../../utils/url";

type Props = {
  chat: IChat | null;
  setIsChatsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatHeader = ({ chat, setIsChatsOpen }: Props) => {
  const { user } = useAuth();
  const { memberTyping } = useMessage();
  const [showOption, setShowOption] = useState(false);

  if (!user) {
    return <></>;
  }

  if (!chat) {
    return <></>;
  }

  const { name, members, image } = getChatInfo(chat, user);
  const navigate = useNavigate();

  return (
    <div className='flex justify-between items-center w-full'>
      <div className='flex justify-start items-center gap-2'>
        <div className='flex justify-start items-center gap-2'>
          <button
            className='sm:hidden'
            onClick={() => {
              setIsChatsOpen(true);
              navigate("/chats");
            }}
          >
            <ChevronLeftIcon className='w-6 h-6' />
          </button>
          <img
            src={url + image}
            className='rounded-full w-10 h-10 border-2 border-primary p-1 border-l-0 border-t-0 object-cover'
            alt={name ? name : "profile picture"}
          />
        </div>

        <div>
          <h2 className='font-semibold'>{name}</h2>
          {memberTyping && chat.chatType === "group" ? (
            <small className='text-success font-semibold'>{memberTyping}</small>
          ) : (
            <small>
              {chat?.chatType === "group"
                ? members.map((member) => member.name + "") + "..."
                : "last seen " +
                  new Date(chat.updatedAt ? chat.updatedAt : "").toDateString()}
            </small>
          )}
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

const removeChatLocal = (chatId: number) => {
  // This fn removes a single chat from local storage
  if (localStorage.getItem("chats")) {
    let myChats: IChat[] = JSON.parse(localStorage.getItem("chats") || "[]");

    myChats = myChats.filter((chat) => chat.id !== chatId);

    localStorage.setItem("chats", JSON.stringify(myChats));
  }
};

const Option = ({ chat, setShowOption }: optionType) => {
  const { user } = useAuth();
  const { deleteChat, leaveGroup, currentChat, setCurrentChat } = useChat();
  const { socket } = useSocket();
  const navigate = useNavigate();

  return (
    <div>
      <div
        className='fixed z-20 bg-transparent top-0 right-0 left-0 bottom-0'
        onClick={() => setShowOption(false)}
      ></div>
      <div className='absolute z-20 top-6 -left-28 bg-white h-fit w-28 text-black'>
        <ul className='text-center flex flex-col justify-stretch gap-2 items-center'>
          {chat.chatType === "private" ? (
            <>
              <li
                className='w-full py-1 hover:bg-danger hover:text-white cursor-pointer duration-200'
                onClick={() => {
                  setShowOption(false);
                  const question = "Are you sure?";
                  if (window.confirm(question)) {
                    deleteChat(chat.id).then(() => {
                      if (currentChat) {
                        removeChatLocal(currentChat.id);
                        socket?.emit("updated-chat", currentChat.members);
                      }
                      navigate("/chats");
                    });
                  }
                }}
              >
                {chat.createdBy === user?.userId ? "Delete Chat" : "Leave Chat"}
              </li>
            </>
          ) : (
            <>
              <li className='w-full py-1 hover:bg-dark hover:text-white cursor-pointer duration-200'>
                Add to group
              </li>
              {chat.createdBy === user?.userId ? (
                <li
                  onClick={() => {
                    setShowOption(false);
                    const question = "Are you sure delete group?";
                    if (window.confirm(question)) {
                      deleteChat(chat.id).then(() => {
                        if (currentChat) {
                          removeChatLocal(currentChat.id);
                          socket?.emit("updated-chat", currentChat.members);
                        }
                        navigate("/chats");
                      });
                    }
                  }}
                  className='w-full py-1 hover:bg-danger hover:text-white cursor-pointer duration-200'
                >
                  Delete Group
                </li>
              ) : (
                <li
                  className='w-full py-1 hover:bg-danger hover:text-white cursor-pointer duration-200'
                  onClick={() => {
                    setShowOption(false);
                    const question = "Are you sure you want to leave group ?";
                    if (window.confirm(question)) {
                      leaveGroup(chat.id).then(() => {
                        if (currentChat) {
                          removeChatLocal(currentChat.id);
                          socket?.emit("updated-chat", currentChat.members);
                        }
                        navigate("/chats");
                      });
                    }
                  }}
                >
                  Leave Group
                </li>
              )}
            </>
          )}

          <li
            className='hidden sm:block w-full py-1 hover:bg-primary hover:text-white cursor-pointer duration-200'
            onClick={() => {
              navigate("/chats");
              setCurrentChat(null);
            }}
          >
            Close Chat
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ChatHeader;
