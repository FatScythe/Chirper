import { useState } from "react";
// Icon
import { EditIcon, SendIcon } from "../icon";
// Types
import { IMessage } from "../../model/message";
// Context
import { useMessage } from "../../context/MessageContext";
import { useChat } from "../../context/ChatContext";
import { useSocket } from "../../context/SocketContext";
import { useAuth } from "../../context/AuthContext";

type Props = {
  chatId: string;
  isEditing: { editing: boolean; message: IMessage };
  setIsEditing: React.Dispatch<
    React.SetStateAction<{ editing: boolean; message: IMessage }>
  >;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
};

const MessageInput = ({
  chatId,
  text,
  setText,
  isEditing,
  setIsEditing,
}: Props) => {
  const { sendMessage, editMessage } = useMessage();
  const { currentChat } = useChat();

  const handleSendMessage = () => {
    sendMessage(chatId, text)
      .then(() => {
        setText("");
        if (currentChat) {
          socket?.emit("updated-chat", currentChat.members);
        }
      })
      .catch((err) => {
        alert(err?.message || "Couldn't send message");
      });
  };

  const handleEditMessage = () => {
    if (!text) {
      alert("Please provide text!");
      return;
    }

    if (text === isEditing.message.text) {
      alert("Please provide a new text");
      return;
    }

    editMessage(isEditing.message.id, text)
      .then(() => {
        setIsEditing({ ...isEditing, editing: false });
        setText("");
        if (currentChat) {
          socket?.emit("updated-chat", currentChat.members);
        }
      })
      .catch((err) => {
        setIsEditing({ ...isEditing, editing: false });
        setText("");
        alert(err?.message || "Couldn't edit message");
      });
  };

  const { socket } = useSocket();
  const { user } = useAuth();
  const { setMemberTyping } = useMessage();

  const [selfTyping, setSelfTyping] = useState(false); // To track if the current user is typing

  socket?.off("isMemberTyping", () => {
    setMemberTyping("");
  });
  socket?.on("isMemberTyping", (message) => {
    setMemberTyping(message);
  });

  return (
    <div className='ml-1 sm:ml-4 flex justify-between items-center gap-1 sm:gap-2'>
      <textarea
        rows={1}
        className='basis-11/12 p-2 rounded-3xl bg-transparent outline-none border border-primary resize-none no-scrollbar'
        placeholder='Message...'
        value={text}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setText(e.target.value);
          setSelfTyping(true);
          socket?.emit("isTyping", user, currentChat);
        }}
        onBlur={() => {
          setSelfTyping(!selfTyping);
          socket?.off("isMemberTyping", () => {
            setMemberTyping("");
          });
        }}
      />
      <button
        className='basis-1/12 disabled:opacity-30'
        onClick={() =>
          isEditing.editing ? handleEditMessage() : handleSendMessage()
        }
        disabled={!text}
      >
        {isEditing.editing ? (
          <EditIcon className='w-10 h-10 bg-primary p-2 rounded-full' />
        ) : (
          <SendIcon className='w-10 h-10 bg-dark p-2 rounded-full' />
        )}
      </button>
    </div>
  );
};

export default MessageInput;
