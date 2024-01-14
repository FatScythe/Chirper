import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// Router
import { BrowserRouter as Router } from "react-router-dom";
// Context
import { AuthProvider } from "./context/AuthContext.tsx";
import ChatProvider from "./context/ChatContext.tsx";
import SocketProvider from "./context/SocketContext.tsx";
import MessageProvider from "./context/MessageContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ChatProvider>
          <MessageProvider>
            <SocketProvider>
              <App />
            </SocketProvider>
          </MessageProvider>
        </ChatProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
