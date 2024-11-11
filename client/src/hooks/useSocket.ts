// hooks/useSocket.ts
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import {useContact} from "./useContact.ts";

const SERVER_URL = "http://localhost:3000"; // Replace with your server URL

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const contactId = useContact().contact?._id;

  useEffect(() => {
    if (!contactId) return; // Prevent socket initialization if no contactId is available

    const socketInstance = io(SERVER_URL, {
      withCredentials: true, // Optional, if you need CORS support
      query: {
        contactId, // 
      },
    });

    // Handle connection errors
    socketInstance.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
      setSocket(null); // Cleanup the socket state
    };
  }, [contactId]); // Ensure the effect runs when contactId changes

  return socket;
};
