import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { IMessage } from "../../model/message";

type Props = {
  message: IMessage;
};
const MessageBubble = ({ message }: Props) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to='/' />;
  }
  if (user?.userId !== message.sender) {
    return (
      <div className='my-2 flex justify-start items-center'>
        <p className='bg-gray-700 mx-3 p-2 rounded-md'>{message.text}</p>
      </div>
    );
  }
  return (
    <div className='my-2 flex justify-end items-center'>
      <p className='bg-primary mx-3 p-2 rounded-md'>{message.text}</p>
    </div>
  );
};

export default MessageBubble;
