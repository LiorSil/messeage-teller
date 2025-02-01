import ChatListItems from "./ChatListItems";
import {useContact} from "../../../hooks/useContact";
import { useChatManager } from "../../../hooks/useChatManager";
import { useEffect, useState } from "react";

const ChatList = () => {
  const { contact } = useContact();
  const { handleChatSelection } = useChatManager();

  const [subContacts, setSubContacts] = useState(contact?.subContacts || []);
  console.log("subContacts", subContacts);

  useEffect(() => {
    console.log("changed")
    setSubContacts(contact?.subContacts || []);
  }, [contact]);

  return (
    <>
      <div className="overflow-y-auto h-screen p-3 mb-9 pb-6">
        <ChatListItems
          subContacts={contact?.subContacts || []}
          handleChatSelection={handleChatSelection}
        />
        <div className="flex justify-center items-center mt-4">
          <p className="text-center">
            <span className="text-gray-800 bg-white">
              You have no more chats
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default ChatList;
