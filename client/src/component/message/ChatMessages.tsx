import { useState } from "react";
// Types
import { IChat } from "../../model/chat";
import { IMessage } from "../../model/message";
// Components
import MessageBubble from "./MessageBubble";

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
  const [showOption, setShowOption] = useState(false);

  const handleDeleteMessage = async () => {
    setIsEditing({ ...isEditing, editing: false });
    try {
      const response = await fetch("/api/v1/message/" + isEditing.message.id, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok) {
        alert(data?.msg || "Couldn't send message");
        return;
      }

      alert(data.msg);
    } catch (error) {
      console.error(error);
      alert("Message was not sent");
    }
  };

  return (
    <div className='h-full w-full relative'>
      {showOption && (
        <div
          className='absolute z-20 bg-transparent -top-1/4 left-0 right-0 -bottom-1/4'
          onClick={() => setShowOption(false)}
        >
          <div className='absolute bg-black w-3/4 sm:w-1/3 rounded-md h-fit top-1/2 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden'>
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
    </div>
  );
};

export default ChatMessages;
