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
    subContacts?.map((subContact, index) => (
      <li key={`${index}_${subContact.subContactId}`} className="space-y-3">
        <ChatItem
          isIncomingMessage={subContact.isIncomingMessage || false}
          onSelectChatItem={() => handleChatSelection(subContact)}
          subContactName={subContact.name}
          imageUrl={
            subContact.avatar ||
            "https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
          }
        />
      </li>
    )) || [];

  return <ul>{chats}</ul>;
};

export default ChatListItems;
