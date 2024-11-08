import { IChat, IMessage } from "../../models/model.interfaces";
import { Server } from "socket.io";
import { debounce } from "../../utils/debounce";
import {
  createMessageService,
  getChatByParticipants,
} from "../../services/chatService";
import { pushNotificationService } from "../../services/notificationService";
import { addSubContactService } from "../../services/contactService";

export const handleSendMessage = debounce(
  async (message: IMessage, io: Server) => {
    try {
      const [sender, recipient] = [message.fromId, message.toId];
      const chat: IChat = await getChatByParticipants([recipient, sender]);
      await createMessageService(chat._id, message);
      await addSubContactService(recipient, sender);
      await pushNotificationService(recipient, sender);

      io.to(recipient.toString()).emit("receive_message", message);
    } catch (error) {
      console.error("Error handling send_message:", error);
    }
  },
  300
);
