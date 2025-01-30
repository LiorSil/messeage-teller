import ChatItem from "./ChatItem";
import { SubContact } from "../../../types/subContact";

interface chatListItemsProps {
  subContacts: SubContact[] | null;
  handleChatSelection: (chatRoom: SubContact | null) => void;
}

const ChatListItems = ({
  subContacts,
  handleChatSelection,
}: chatListItemsProps) => {

  if (!subContacts) return null;
  
  const chats =
    subContacts?.map((contact, index) => (
      <li key={`${index}_${contact._id}`} className="space-y-3">
        <ChatItem
          isIncomingMessage={contact.isIncomingMessage || false}
          onSelectChatItem={() => handleChatSelection(contact)}
          contactName={contact.name}
          imageUrl={
            contact.avatar ||
            "https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
          }
        />
      </li>
    )) || [];

  return <ul>{chats}</ul>;
};

export default ChatListItems;
