import { IChat, IMessage } from "../../interfaces/model.interfaces";
import { Server } from "socket.io";
import { debounce } from "../../utils/debounce";
import {
  createMessageService,
  getChatByParticipants,
} from "../../services/chat.service";

import { pushNotificationService } from "../../services/notification.service";
import { Participant } from "../../types/chat.type";

export const handleSendMessage = debounce(
  async (message: IMessage, io: Server) => {
    try {
      const [sender, recipient] = [message.fromId, message.toId];
      const chat: IChat = await getChatByParticipants([
        recipient,
        sender,
      ] as Array<Participant>);
      await createMessageService(chat._id, message);
      await pushNotificationService(recipient, sender);
      io.to(recipient.toString()).emit("receive_message", message);
    } catch (error) {
      console.error("Error handling send_message:", error);
    }
  },
  300
);
