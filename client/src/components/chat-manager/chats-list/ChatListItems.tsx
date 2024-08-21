import React from "react";
import ChatItem from "./ChatItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const ChatListItems: React.FC = () => {
  const { currentContact } = useSelector((state: RootState) => state.contact);
  if (!currentContact) return null;
  const chats =
    currentContact?.contacts.map((contact, index) => (
      <li key={`${index}_${contact._id}`} className="space-y-3">
        <ChatItem
          lastMessage={
            contact.lastMessage || "Hi There, I'm using Message Teller"
          }
          contactName={contact.name}
          imageUrl={
            contact.imageUrl ||
            "https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
          }
        />
      </li>
    )) || [];

  return <ul>{chats}</ul>;
};

export default ChatListItems;
