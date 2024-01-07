import { useState } from "react";
// Icon
import { SendIcon } from "../icon";

type Props = {
  chatId: string;
};

const MessageInput = ({ chatId }: Props) => {
  const [text, setText] = useState("");
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

  return (
    <div className='flex justify-between items-center w-full'>
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
        className='basis-1/12 mx-auto disabled:opacity-30'
        onClick={() => sendMessage()}
        disabled={!text}
      >
        <SendIcon className='w-10 h-10 bg-dark p-2 rounded-full' />
      </button>
    </div>
  );
};

export default MessageInput;
