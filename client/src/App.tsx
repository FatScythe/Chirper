import "./App.css";
// Context
import { useAuth } from "./context/AuthContext";
// Router
import { Routes, Route, Navigate } from "react-router-dom";
// Pages
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/Notfound";
import ChatLayout from "./component/chat/ChatLayout";

function App() {
  const { isLoading, user } = useAuth();
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
              <div className='grid place-items-center text-3xl italic font-semibold h-screen'>
                Pick or create a Chat
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
