import {IChat, IMessage} from "../../models/model.interfaces";
import {Server} from "socket.io";
import {debounce} from "../../utils/debounce";
import chatService from "../../services/chatService";
import notificationService from "../../services/notificationService";

export const handleSendMessage = debounce(
    async (message: IMessage, io: Server) => {
        console.log("Handling send_message:", message);
        const [sender, recipient] = [message.fromId, message.toId];
        try {
            const chat: IChat = await chatService.getOrCreateChat(sender, recipient);
            await chatService.createMessage(chat._id, message);
            await notificationService.createOrUpdateNotification(sender, recipient);
            io.to(recipient.toString()).emit("receive_message", message);
        } catch (error) {
            console.error("Error handling send_message:", error);
        }
    },
    300
);



