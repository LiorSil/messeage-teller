import React, { useEffect, useMemo, useState } from "react";
import ChatLayout from "../../components/chat-session/ChatLayout";
import ChatsManagerLayout from "../../components/chat-manager/chatsManagerLayout";
import { useSocket } from "../../hooks/useSocket";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const ChatRoom: React.FC = () => {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  const { userData } = useSelector((state: any) => state.auth);
  const { token, email, phoneNumber } = userData || {};
  const cookies = useMemo(() => new Cookies(), []);

  useEffect(() => {
    // Check if the token exists in cookies or state
    let existingToken = cookies.get("token");

    if (!existingToken && token) {
      // If token is not in cookies but exists in state, set it
      cookies.set("token", token, {
        path: "/",
        sameSite: "none",
        secure: true,
      });
      existingToken = token;
    }

    if (!existingToken) {
      // If no token is found, navigate to unauthorized page
      navigate("/unauthorized");
    }
  }, [token, cookies, navigate]);

  const socket = useSocket();

  const baseClass =
    "w-full flex flex-col h-screen bg-app-palette-sap-green-light-+40";

  const getClassNames = (isSelected: boolean, mdWidth: string) => {
    return `${baseClass} ${mdWidth} ${isSelected ? "flex" : "hidden md:flex"}`;
  };

  // Set the socket event listeners
  useEffect(() => {
    if (socket) {
      socket.on("message", (message: string) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [socket]);

  const sendMessage = (message: string) => {
    if (socket) {
      socket.emit("message", message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className={getClassNames(!selectedChat, "md:w-1/3")}>
        <ChatsManagerLayout />
      </div>
      <div className={getClassNames(!!selectedChat, "md:w-2/3")}>
        <ChatLayout />
      </div>
    </div>
  );
};

export default ChatRoom;
