import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = (url: string) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(url);

    return () => {
      // Cleanup on component unmount
      socketRef.current?.disconnect();
    };
  }, [url]);

  return socketRef.current;
};

export default useSocket;
