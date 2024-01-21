import "./App.css";
import { useEffect } from "react";
// Context
import { useAuth } from "./context/AuthContext";
import { useSocket } from "./context/SocketContext";
// Router
import { Routes, Route, Navigate, Link } from "react-router-dom";
// Pages
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/Notfound";
import ChatLayout from "./component/chat/ChatLayout";

function App() {
  const { isLoading, user } = useAuth();
  const { socket } = useSocket();

  useEffect(() => {
    // Connect user to socket io
    if (user) socket?.emit("connect-user", user);
  }, [socket, user]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/chats' />} />
        <Route
          path='/chats'
          element={!isLoading && user ? <Chat /> : <Navigate to='/login' />}
        >
          <Route
            index
            element={
              <div className='flex flex-col justify-center items-center gap-5 font-semibold h-screen'>
                <h2 className='text-2xl sm:text-3xl italic'>
                  Pick or create a Chat
                </h2>
                <div className='w-full text-center sm:hidden'>
                  <Link
                    to='/'
                    className='sm:hidden bg-primary px-4 py-2 rounded-2xl'
                  >
                    Go back to chats
                  </Link>
                </div>
              </div>
            }
          />
          <Route path='/chats/:id' element={<ChatLayout />} />
        </Route>
        <Route
          path='/register'
          element={!user ? <Register /> : <Navigate to='/chats' />}
        />
        <Route
          path='/login'
          element={!user ? <Login /> : <Navigate to='/chats' />}
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
