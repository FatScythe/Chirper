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
          <Route index element={<div>Single Chat</div>} />
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
