import { IChat, IMessage } from "../../interfaces/model.interfaces";
import { Server } from "socket.io";
import { debounce } from "../../utils/debounce";
import {
  createMessageService,
  getChatByParticipants,
} from "../../services/chat.service";
import { addSubContactService } from "../../services/contact.service";
import { pushNotificationService } from "../../services/notification.service";

export const handleSendMessage = debounce(
  async (message: IMessage, io: Server) => {
    try {
      const [sender, recipient] = [message.fromId, message.toId];
      const chat: IChat = await getChatByParticipants([recipient, sender]);
      await createMessageService(chat._id, message);

      const isNewSubContact = await addSubContactService(recipient, sender);
      await pushNotificationService(recipient, sender);
      io.to(recipient.toString()).emit("receive_message", message);
    } catch (error) {
      console.error("Error handling send_message:", error);
    }
  },
  300
);
