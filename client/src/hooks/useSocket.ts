// hooks/useSocket.ts
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { RootState } from "../redux/store";

const SERVER_URL = "http://localhost:3000"; // Replace with your server URL

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const contactId = useSelector(
    (state: RootState) => state.contact.contact?._id
  );

  useEffect(() => {
    if (!contactId) return; // Prevent socket initialization if no contactId is available

    const socketInstance = io(SERVER_URL, {
      withCredentials: true, // Optional, if you need CORS support
      query: {
        contactId, // Send the contact._id as a query parameter
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
