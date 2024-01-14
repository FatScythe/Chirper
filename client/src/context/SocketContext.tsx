import { createContext, useContext, useEffect, useState } from "react";
import socketio from "socket.io-client";
import url from "../utils/url";

const SocketContext = createContext<{
  socket: ReturnType<typeof socketio> | null;
}>({ socket: null });

const getSocket = () => {
  // Create a socket connection with the provided URI and authentication
  return socketio(url);
};

const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<ReturnType<typeof socketio> | null>(
    null
  );

  useEffect(() => {
    setSocket(getSocket());
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

export default SocketProvider;
