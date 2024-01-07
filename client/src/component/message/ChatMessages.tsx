// Types
import { IChat } from "../../model/chat";
// Components
import MessageBubble from "./MessageBubble";

type Props = {
  chat: IChat;
};

const ChatMessages = ({ chat }: Props) => {
  if (chat.messages === undefined || !chat.messages) {
    return <></>;
  }

  return (
    <div className='h-full w-full'>
      {chat.messages.map((message) => {
        return <MessageBubble key={message.id} message={message} />;
      })}
    </div>
  );
};

export default ChatMessages;
