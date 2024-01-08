import { Navigate } from "react-router-dom";
// Context
import { useAuth } from "../../context/AuthContext";
// Types
import { IMessage } from "../../model/message";
import { OptionIcon } from "../icon";

type Props = {
  message: IMessage;
  setShowOption: React.Dispatch<React.SetStateAction<boolean>>;
};
const MessageBubble = ({ message, setShowOption }: Props) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to='/' />;
  }

  const isUserMessage = user.userId === message.sender;

  return (
    <div
      className={`my-2 flex ${
        isUserMessage ? "justify-end group" : "justify-start"
      } items-center cursor-pointer gap-2 `}
    >
      <p
        className={`${
          isUserMessage ? "bg-primary mr-3 order-2" : "bg-gray-700 ml-3 order-1"
        } p-2 rounded-md`}
      >
        {message.text}
      </p>
      <button
        onClick={() => setShowOption(true)}
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
