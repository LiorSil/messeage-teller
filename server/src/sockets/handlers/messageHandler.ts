import { IChat, IMessage } from "../../models/model.interfaces";
import { Server } from "socket.io";
import { debounce } from "../../utils/debounce";
import {
  createMessageService,
  getChatByParticipants,
} from "../../services/chatService";
import { pushNotificationService } from "../../services/notificationService";

export const handleSendMessage = debounce(
  async (message: IMessage, io: Server) => {
    try {
      console.log("Handling send_message:", message);
      const [sender, recipient] = [message.fromId, message.toId];
      const chat: IChat = await getChatByParticipants([recipient, sender]);
      await createMessageService(chat._id, message);
      pushNotificationService(recipient, sender);

      io.to(recipient.toString()).emit("receive_message", message);
    } catch (error) {
      console.error("Error handling send_message:", error);
    }
  },
  300
);
