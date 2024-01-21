import { useState } from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
// Context
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";
// Components
import AllChats from "../component/chat/AllChats";
import CreateChat from "../component/chat/CreateChat";
// Icon
import { LogoutIcon } from "../component/icon";
import { useChat } from "../context/ChatContext";

type ContextType = {
  setIsChatsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Chat = () => {
  const [isChatsOpen, setIsChatsOpen] = useState(true);
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { socket } = useSocket();
  const { getChats } = useChat();

  socket?.off("receive-update"); // Diconnect listener
  // Connect listener
  socket?.on("receive-update", (isUpdated) => {
    if (isUpdated) {
      getChats();
    }
  });

  return (
    <section className='grid grid-cols-12 h-screen relative sm:static bg-dark/90 text-white overflow-hidden'>
      <aside
        className={`p-2 bg-dark sm:col-span-4 fixed sm:static z-10 ${
          isChatsOpen ? "left-0 right-0" : "-left-full"
        } top-0 bottom-0 transition-all duration-200`}
      >
        <div className='flex justify-between items-center px-2'>
          <h1
            className='text-xl sm:text-2xl md:text-3xl font-semibold'
            onClick={() => navigate("/chats")}
          >
            Chats
          </h1>

          <button
            className='p-2 rounded-full hover:bg-danger'
            onClick={() => {
              // Disconnect user from socket io
              socket?.emit("disconnect-user", user);
              alert("Are you sure you want to logout?");
              logout();
              localStorage.removeItem("chats");
            }}
            title='logout'
          >
            <LogoutIcon className='w-6 h-6' />
          </button>
        </div>
        <div className='my-4 flex justify-start items-center gap-2 relative'>
          <CreateChat />
        </div>
        <AllChats isChatsOpen={isChatsOpen} setIsChatsOpen={setIsChatsOpen} />
      </aside>
      <main className='col-span-12 sm:col-span-8'>
        <Outlet context={{ setIsChatsOpen } satisfies ContextType} />
      </main>
    </section>
  );
};

export function useChatOpen() {
  return useOutletContext<ContextType>();
}
export default Chat;
