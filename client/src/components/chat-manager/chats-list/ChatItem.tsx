interface ChatItemProps {
  isIncomingMessage: boolean;
  subContactName: string;
  imageUrl: string;
  onSelectChatItem: () => void;
}

const ChatItem = ({
  isIncomingMessage,
  subContactName,
  imageUrl,
  onSelectChatItem,
}: ChatItemProps) => {
  return (
    <div
      onClick={onSelectChatItem}
      className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
    >
      <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
        <img
          src={imageUrl}
          alt={`${subContactName}'s Avatar`}
          className="w-12 h-12 rounded-full border-2 border-black object-cover object-center"
        />
      </div>
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{subContactName}</h2>
      </div>
      {isIncomingMessage && (
        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
      )}
    </div>
  );
};

export default ChatItem;
