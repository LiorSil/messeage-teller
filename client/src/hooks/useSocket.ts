// hooks/useSocket.ts
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SERVER_URL = "http://localhost:3000"; // Replace with your server URL

export const useSocket = (contactId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(SERVER_URL, {
      withCredentials: true, // Optional, if you need CORS support
      query: {
        contactId, // Send the contact._id as a query parameter
      },
    });

    setSocket(socketInstance);

    // Clean up the socket connection on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return socket;
};
