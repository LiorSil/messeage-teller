import ChatListItems from "./ChatListItems";
import useContact from "../../../hooks/useContact";
import Loading from "../../../shared/Loading";
import ErrorMessage from "../../../shared/ErrorMessage";
import { useChatManager } from "../../../hooks/useChatManager";

const ChatList = () => {
  const { error, loading, sortedSubContacts } = useContact();
  const { handleChatSelection } = useChatManager();

  if (!sortedSubContacts) return null;

  return (
    <>
      {loading && <Loading />}
      {error && <ErrorMessage error="Can't get user's contacts" />}

      <div className="overflow-y-auto h-screen p-3 mb-9 pb-6">
        <ChatListItems
          subContacts={sortedSubContacts}
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
