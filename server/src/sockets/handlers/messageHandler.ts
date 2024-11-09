import { IChat, IMessage } from "../../models/model.interfaces";
import { Server } from "socket.io";
import { debounce } from "../../utils/debounce";
import {
  createMessageService,
  getChatByParticipants,
} from "../../services/chatService";
import { addSubContactService } from "../../services/contactService";
import { pushNotificationService } from "../../services/notificationService";

export const handleSendMessage = debounce(
  async (message: IMessage, io: Server) => {
    try {
      const [sender, recipient] = [message.fromId, message.toId];
      const chat: IChat = await getChatByParticipants([recipient, sender]);
      await createMessageService(chat._id, message);
      const isNewSubContact = await addSubContactService(recipient, sender);
      await pushNotificationService(recipient, sender);
      if (isNewSubContact) {
        console.log("New subContact added");
        io.to(recipient.toString()).emit("receive_message", message);
      } else io.to(recipient.toString()).emit("receive_message", message);
    } catch (error) {
      console.error("Error handling send_message:", error);
    }
  },
  300
);
