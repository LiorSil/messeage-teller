import NavBar from "./profile-nav/nav-bar/NavBar";
import ChatList from "./chats-list/ChatList";
import { SubContact } from "../../types/subContact";

interface ChatsManagerLayoutProps {
  handleChatSelection: (chatRoom: SubContact | null) => void;
}
const ChatsManagerLayout = ({
  handleChatSelection,
}: ChatsManagerLayoutProps) => {
  return (
    <>
      <NavBar />
      <ChatList handleChatSelection={handleChatSelection} />
    </>
  );
};

export default ChatsManagerLayout;
