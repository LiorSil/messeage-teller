import { useChatHeader } from "../../../hooks/useChatHeader";
import useModifySubContacts from "../../../hooks/useModifySubContacts";
import IconButton from "./IconButton";

const ChatHeader = () => {
  const { isSmallScreen, selectedChat, handleReturnButtonClick } =
    useChatHeader();
  const { handleModifyContact } = useModifySubContacts();

  return (
    <div className="sticky top-0 z-10 bg-app-palette-sap-green-light-+30">
      <header className="flex justify-between items-center py-3 px-4 border-b-2 border-black  ">
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <div className="flex">
            {isSmallScreen && (
              <IconButton onClick={handleReturnButtonClick} icon="return" />
            )}
            <div className="relative">
              <img
                src={selectedChat?.avatar}
                alt="chat-avatar"
                className="w-12 h-12 rounded-full border-2 border-gray-300 object-cover"
              />
              {/* Status Indicator */}
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border border-white"></span>
            </div>
          </div>

          {/* Chat Details */}
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-gray-800 leading-none">
              {selectedChat?.name}
            </h2>
            <span className="text-sm text-gray-500">{selectedChat?._id}</span>
          </div>
          <IconButton
            icon="garbage"
            onClick={() =>
              selectedChat && handleModifyContact(selectedChat._id, "delete")
            }
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <IconButton icon="search" />
          <IconButton icon="heart" />
          <IconButton icon="bell" />
        </div>
      </header>
    </div>
  );
};

        export default ChatHeader;
