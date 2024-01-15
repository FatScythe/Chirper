import { createContext, useContext, useState, useEffect } from "react";

const MessageContext = createContext<{
  sendMessage: (chatId: string, text: string) => Promise<void>;
  editMessage: (messageId: number, text: string) => Promise<void>;
  deleteMessage: (messageId: number) => Promise<void>;
  memberTyping: string;
  setMemberTyping: React.Dispatch<React.SetStateAction<string>>;
}>({
  sendMessage: async () => {},
  editMessage: async () => {},
  deleteMessage: async () => {},
  memberTyping: "",
  setMemberTyping: () => null,
});

const MessageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const sendMessage = async (chatId: string, text: string) => {
    const response = await fetch("/api/v1/message", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ chatId, text }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.msg);
    }
  };

  const editMessage = async (messageId: number, text: string) => {
    const response = await fetch("/api/v1/message/" + messageId, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.msg);
    }

    alert(data.msg);
  };

  const deleteMessage = async (messageId: number) => {
    const response = await fetch("/api/v1/message/" + messageId, {
      method: "DELETE",
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.msg || "Couldn't send message");
    }

    alert(data.msg);
  };

  const [memberTyping, setMemberTyping] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setMemberTyping("");
    }, 2000);
  }, [memberTyping]);

  return (
    <MessageContext.Provider
      value={{
        sendMessage,
        editMessage,
        deleteMessage,
        memberTyping,
        setMemberTyping,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);

export default MessageProvider;
