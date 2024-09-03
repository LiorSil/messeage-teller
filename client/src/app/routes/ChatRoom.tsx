import React, { useCallback, useEffect, useMemo, useState } from "react";
import ChatLayout from "../../components/chat-session/ChatLayout";
import ChatsManagerLayout from "../../components/chat-manager/ChatsManagerLayout";
import { useSocket } from "../../hooks/useSocket";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { RootState } from "../../redux/store";

const ChatRoom: React.FC = () => {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  const token = useSelector((state: RootState) => state.auth.token);

  const cookies = useMemo(() => new Cookies(), []);

  useEffect(() => {
    let existingToken = cookies.get("token");

    if (!existingToken && token) {
      cookies.set("token", token, {
        path: "/",
        sameSite: "none",
        secure: true,
      });
      existingToken = token;
    }

    if (!existingToken) {
      navigate("/unauthorized");
    }
  }, [token, cookies, navigate]);

  const socket = useSocket();

  const baseClass =
    "w-full flex flex-col h-screen bg-app-palette-sap-green-light-+40";

  const getClassNames = useMemo(
    () => (isSelected: boolean, mdWidth: string) => {
      return `${baseClass} ${mdWidth} ${isSelected ? "flex" : "hidden md:flex"}`;
    },
    [baseClass]
  );

  useEffect(() => {
    if (socket) {
      socket.on("message", (message: string) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [socket]);

  const sendMessage = useCallback(
    (message: string) => {
      if (socket) {
        socket.emit("message", message);
      }
    },
    [socket]
  );

  return (
    <div className="flex flex-col md:flex-row">
      <div className={getClassNames(!selectedChat, "md:w-1/3")}>
        <ChatsManagerLayout />
      </div>
      <div className={getClassNames(!!selectedChat, "md:w-2/3")}>
        <ChatLayout
          selectedChat={selectedChat}
          messages={messages}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default ChatRoom;
