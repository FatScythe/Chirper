import { useState } from "react";
// Context
// import { useAuth } from "../context/AuthContext";
// Components
import SingleChat from "../component/chat/SingleChat";

const Chat = () => {
  // const {isLoading} = useAuth();
  // console.log(isLoading, "here");
  const [isChatsOpen, setIsChatsOpen] = useState<Boolean>(true);
  return (
    <section className='grid grid-cols-12 h-screen relative sm:static bg-dark/90 text-white overflow-hidden'>
      <aside
        className={`p-4 sm:p-2 bg-dark sm:col-span-4 fixed sm:static z-10 ${
          isChatsOpen ? "left-0 right-0" : "-left-full"
        } top-0 bottom-0 transition-all duration-200`}
      >
        <h1
          className='text-xl sm:text-2xl md:text-3xl font-semibold'
          onClick={() => setIsChatsOpen(false)}
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

        <SingleChat />
        <SingleChat />
        <SingleChat />
        <SingleChat />
        <SingleChat />
        <SingleChat />
        <SingleChat />
        <SingleChat />
        <SingleChat />
        <SingleChat />
      </aside>
      <main className='col-span-12 sm:col-span-8'>
        <h1 className='text-xl font-bold' onClick={() => setIsChatsOpen(true)}>
          Single Chat
        </h1>
      </main>
    </section>
  );
};

export default Chat;
