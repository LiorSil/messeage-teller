import React from "react";
import ChatListItems from "./ChatListItems";
import useContact from "../../../hooks/useContact";
import Loading from "../../../shared/Loading";
import ErrorMessage from "../../../shared/ErrorMessage";

const ChatList: React.FC = () => {
  const { contact, error, loading } = useContact();

  if (loading) <Loading />;
  if (error) <ErrorMessage error="Can't get user's contacts" />;
  if (!contact?.contacts) return null;

  return (
    <div className="overflow-y-auto h-screen p-3 mb-9 pb-6">
      <ChatListItems contacts={contact?.contacts} />
      <div className="flex justify-center items-center mt-4">
        <p className="text-center">
          <span className="text-gray-800 bg-white">You have no more chats</span>
        </p>
      </div>
    </div>
  );
};

export default ChatList;
