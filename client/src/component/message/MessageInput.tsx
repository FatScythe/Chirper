// Icon
import { EditIcon, SendIcon } from "../icon";
import { IMessage } from "../../model/message";

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
  const sendMessage = async () => {
    try {
      const response = await fetch("/api/v1/message", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ chatId, text }),
      });
      const data = await response.json();

      if (!response.ok) {
        alert(data?.msg || "Couldn't send message");
        return;
      }
      setText("");
    } catch (error) {
      console.error(error);
      alert("Message was not sent");
    }
  };

  const handleEditMessage = async () => {
    try {
      if (!text) {
        alert("Please provide text!");
        return;
      }

      if (text === isEditing.message.text) {
        alert("Please provide a new text");
        return;
      }

      const response = await fetch("/api/v1/message/" + isEditing.message.id, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();

      if (!response.ok) {
        setText("");
        setIsEditing({ ...isEditing, editing: false });
        alert(data?.msg || "Couldn't send message");
        return;
      }

      alert(data.msg);
      setIsEditing({ ...isEditing, editing: false });
      setText("");
    } catch (error) {
      setText("");
      setIsEditing({ ...isEditing, editing: false });
      console.error(error);
      alert("Message was not sent");
    }
  };

  return (
    <div className='ml-1 sm:ml-4 flex justify-between items-center gap-1 sm:gap-2'>
      <textarea
        rows={1}
        className='basis-11/12 p-2 rounded-3xl bg-transparent outline-none border border-primary resize-none no-scrollbar'
        placeholder='Message...'
        value={text}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setText(e.target.value);
        }}
      />
      <button
        className='basis-1/12 disabled:opacity-30'
        onClick={() =>
          isEditing.editing ? handleEditMessage() : sendMessage()
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
