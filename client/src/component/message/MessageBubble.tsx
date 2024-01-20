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

  // Checks if message belongs to the curret user
  const isUserMessage = user.userId === message.sender;

  // Reformat hour and minute string to padStart or padEnd with 0
  const hour =
    new Date(message?.updatedAt || 0).getHours().toString().length > 1
      ? new Date(message?.updatedAt || 0).getHours().toString()
      : "0" + new Date(message?.updatedAt || 0).getHours().toString();

  const minute =
    new Date(message?.updatedAt || 0).getMinutes().toString().length > 1
      ? new Date(message?.updatedAt || 0).getMinutes().toString()
      : new Date(message?.updatedAt || 0).getMinutes().toString() + "0";

  const time = hour + ":" + minute;

  // Check if message was editted
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
        } p-0.5 rounded-md gap-1 max-w-[60%] text-pretty overflow-clip`}
      >
        <p className='self-start mr-4 break-all'>{message.text}</p>
        <small className='self-end text-[0.5rem] text-gray-200 font-semibold'>
          {isMessageEditted ? `Editted at: ${time}` : time}
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
