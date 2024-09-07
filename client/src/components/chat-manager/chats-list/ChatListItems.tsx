import React from "react";
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
  const chats =
    subContacts?.map((contact, index) => (
      <li key={`${index}_${contact._id}`} className="space-y-3">
        <ChatItem
          onSelectChatItem={() => handleChatSelection(contact)}
          lastMessage={
            contact.lastMessage || "Hi There, I'm using Message Teller"
          }
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
