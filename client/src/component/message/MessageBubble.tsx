import { Navigate } from "react-router-dom";
// Context
import { useAuth } from "../../context/AuthContext";
// Types
import { IMessage } from "../../model/message";
// Icon
import { OptionIcon } from "../icon";

type Props = {
  message: IMessage;
  setShowOption: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing: { editing: boolean; message: IMessage };
  setIsEditing: React.Dispatch<
    React.SetStateAction<{ editing: boolean; message: IMessage }>
  >;
};
const MessageBubble = ({
  message,
  setShowOption,
  isEditing,
  setIsEditing,
}: Props) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to='/' />;
  }

  const isUserMessage = user.userId === message.sender;
  const time =
    new Date(message?.updatedAt || 0).getHours().toString() +
    ":" +
    new Date(message?.updatedAt || 0).getMinutes().toString();
  const isMessageEditted =
    new Date(message?.createdAt || 0).getTime() <
    new Date(message?.updatedAt || 0).getTime();

  return (
    <div
      className={`my-2 flex ${
        isUserMessage ? "justify-end group" : "justify-start"
      } items-center cursor-pointer gap-2 `}
    >
      <div
        className={`flex flex-col justify-between items-start ${
          isUserMessage ? "bg-primary mr-3 order-2" : "bg-gray-700 ml-3 order-1"
        } p-0.5 rounded-md gap-1`}
      >
        <p className='self-start mr-4'>{message.text}</p>
        <small className='self-end text-[0.5rem] text-gray-200'>
          {isMessageEditted ? "Editted at: " + time : time}
        </small>
      </div>
      <button
        onClick={() => {
          setShowOption(true);
          setIsEditing({ ...isEditing, message });
        }}
        className={`${
          isUserMessage ? "order-1" : "order-2"
        } hidden group-hover:block hover:bg-white/45 rounded-full p-1`}
      >
        <OptionIcon className='w-6 h-6 rotate-90' />
      </button>
    </div>
  );
};

export default MessageBubble;
