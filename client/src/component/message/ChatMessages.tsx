import { useEffect, useRef, useState } from "react";
// Types
import { IChat } from "../../model/chat";
import { IMessage } from "../../model/message";
// Components
import MessageBubble from "./MessageBubble";
import Typing from "../chat/Typing";
// Context
import { useMessage } from "../../context/MessageContext";
import { useChat } from "../../context/ChatContext";
import { useSocket } from "../../context/SocketContext";

type Props = {
  chat: IChat | null;
  isEditing: { editing: boolean; message: IMessage };
  setIsEditing: React.Dispatch<
    React.SetStateAction<{ editing: boolean; message: IMessage }>
  >;
  setText: React.Dispatch<React.SetStateAction<string>>;
};

const ChatMessages = ({ chat, isEditing, setIsEditing, setText }: Props) => {
  if (!chat) {
    return <></>;
  }

  if (chat.messages === undefined || !chat.messages) {
    return <></>;
  }

  const [showOption, setShowOption] = useState(false); // To show delete and edit message modal
  const { deleteMessage, memberTyping } = useMessage();
  const { currentChat } = useChat();
  const { socket } = useSocket();

  const handleDeleteMessage = async () => {
    setIsEditing({ ...isEditing, editing: false });
    deleteMessage(isEditing.message.id)
      .then(() => {
        if (currentChat) {
          socket?.emit("updated-chat", currentChat.members);
        }
      })
      .catch((err) => alert(err.message));
  };

  // Scroll message to the bottom when chat is updated
  const refMessageEnd = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    refMessageEnd.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chat]);

  return (
    <div className='h-fit relative'>
      {showOption && (
        <div
          className='absolute z-20 bg-transparent -top-1/4 left-0 right-0 -bottom-1/4'
          onClick={() => setShowOption(false)}
        >
          <div className='fixed bg-black w-3/4 sm:w-1/3 rounded-md h-fit top-1/2 left-1/2 sm:left-2/3 right-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden'>
            <div className='flex flex-col justify-center items-center'>
              <button
                className='bg-primary w-full py-2 hover:bg-primary/35 hover:font-semibold transition-all duration-200'
                onClick={() => {
                  setIsEditing({ ...isEditing, editing: true });
                  setText(isEditing.message.text);
                }}
              >
                Edit Message
              </button>
              <button
                className='bg-danger w-full py-2 hover:bg-danger/35 hover:font-semibold transition-all duration-200'
                onClick={handleDeleteMessage}
              >
                Delete Message
              </button>
            </div>
          </div>
        </div>
      )}
      {chat.messages.map((message) => {
        return (
          <MessageBubble
            key={message.id}
            message={message}
            setShowOption={setShowOption}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        );
      })}
      {memberTyping && chat.chatType === "private" && <Typing />}
      <div
        ref={refMessageEnd}
        className={`${
          memberTyping ? "h-14" : "h-0"
        } transition-all duration-700`}
      ></div>
    </div>
  );
};

export default ChatMessages;
