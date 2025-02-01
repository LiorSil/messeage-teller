import {useCallback} from "react";
import {useSocket} from "./useSocket";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {Message} from "../types/message";
import {useMessages} from "./useMessages";
import {useNotification} from "./useNotification";
import {useChatInput} from "./useChatInput";
import {useContact} from "./useContact";
import {initSocketEvents} from "../sockets/socketEvents";
import { Contact } from "../types/contact";

export const useChatSession = () => {
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat
  );
  const socket = useSocket();
  const { contact } = useContact();
  const { newMessages, createMessageOnScreen } = useMessages();
  const createNotification = useNotification();
  const { inputValue, handleInputChange, clearInput } = useChatInput();

  // Handle receiving messages from the server
  const receiveMessage = useCallback(
    (message: Message) => {
      console.log("Received message!");
      if (message.fromId === selectedChat?._id) createMessageOnScreen(message);
      if (!isSenderInSubContact(contact!!, message.fromId))
        console.log("Received message from new subContact");

      createNotification(message);
    },
    [selectedChat?._id, createMessageOnScreen, createNotification]
  );

  // Initialize socket events with message receiving logic
  const { sendMessage: emitMessage } = initSocketEvents(socket, receiveMessage);

  const sendMessage = useCallback(() => {
    if (!inputValue.trim()) return;

    const message: Message = {
      fromId: contact?._id || "",
      toId: selectedChat?._id || "",
      content: inputValue.trim(),
      sentTD: new Date(),
    };
    createMessageOnScreen(message);
    emitMessage(message);
    clearInput();
  }, [
    inputValue,
    selectedChat,
    clearInput,
    contact,
    emitMessage,
    createMessageOnScreen,
  ]);

  const isSenderInSubContact = (contact: Contact, sender: string): boolean => {
    const subContactsIds = contact.subContacts.map((sc) => sc._id);
    console.log("sender:", sender, "typeof: ", typeof sender);
    if (subContactsIds.some((scId) => scId === sender)) return true;
    else return false;
  };

  return {
    newMessages,
    inputValue,
    handleInputChange,
    sendMessage,
    contactId: contact?._id,
    hasActiveChat: !!selectedChat,
  };
};
