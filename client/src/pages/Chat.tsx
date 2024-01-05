import { useState } from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
// Context
// import { useAuth } from "../context/AuthContext";
// Components
import AllChats from "../component/chat/AllChats";

type ContextType = {
  setIsChatsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Chat = () => {
  const [isChatsOpen, setIsChatsOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <section className='grid grid-cols-12 h-screen relative sm:static bg-dark/90 text-white overflow-hidden'>
      <aside
        className={`p-2 bg-dark sm:col-span-4 fixed sm:static z-10 ${
          isChatsOpen ? "left-0 right-0" : "-left-full"
        } top-0 bottom-0 transition-all duration-200`}
      >
        <h1
          className='text-xl sm:text-2xl md:text-3xl font-semibold'
          onClick={() => {
            navigate("/chats");
          }}
        >
          Chats
        </h1>
        <div className='my-4'>
          <input
            type='search'
            placeholder='Search or start a new chat'
            className='bg-transparent border-transparent border border-b-primary w-full outline-none focus:border-2'
          />
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
