import ChatLayout from "../../components/chat-session/ChatLayout";
import ChatsManagerLayout from "../../components/chat-manager/ChatsManagerLayout";
import { useChatRoom } from "../../hooks/useChatRoom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ChatRoom: React.FC = () => {
  const { handleChatSelection, getClassNames } = useChatRoom();
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat
  );

  console.log("selectedChat", selectedChat);

  return (
    <div className="flex flex-col md:flex-row">
      <div className={getClassNames(!selectedChat, "md:w-1/3")}>
        <ChatsManagerLayout handleChatSelection={handleChatSelection} />
      </div>
      <div className={getClassNames(!!selectedChat, "md:w-2/3")}>
        <ChatLayout selectedChat={selectedChat} />
      </div>
    </div>
  );
};

export default ChatRoom;
