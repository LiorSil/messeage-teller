import ChatSessionLayout from "../../components/chat-session/ChatSessionLayout";
import ChatsManagerLayout from "../../components/chat-manager/ChatsManagerLayout";
import { useChatRoom } from "../../hooks/useChatRoom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ChatRoom: React.FC = () => {
  const { getClassNames } = useChatRoom();
  const { isChatMangerView } = useSelector((state: RootState) => state.chat);

  return (
    <div className="flex flex-col md:flex-row">
      <div className={getClassNames(isChatMangerView, "md:w-1/3")}>
        <ChatsManagerLayout />
      </div>
      <div className={getClassNames(!isChatMangerView, "md:w-2/3")}>
        <ChatSessionLayout />
      </div>
    </div>
  );
};

export default ChatRoom;
