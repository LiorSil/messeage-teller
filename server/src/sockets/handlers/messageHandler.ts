import {IChat, IMessage} from "../../models/model.interfaces";
import {Server} from "socket.io";
import {debounce} from "../../utils/debounce";
import chatService from "../../services/chatService";
import {Types} from "mongoose";
import notificationService from "../../services/notificationService";

export const handleSendMessage = debounce(
    async (message: IMessage, io: Server) => {
        const [sender, recipient] = [message.fromId, message.toId];
        try {
            const chat: IChat = await getChat(sender, recipient);
            await chatService.createMessage(chat._id, message);
            await notifyRecipient(sender, recipient);
            io.to(recipient.toString()).emit("receive_message", message);
        } catch (error) {
            console.error("Error handling send_message:", error);
        }
    },
    300
);

const getChat = async (
    contactAId: Types.ObjectId,
    contactBId: Types.ObjectId
): Promise<IChat> => {
    return await chatService.getOrCreateChat(contactAId, contactBId);
};

const notifyRecipient = async (fromId: Types.ObjectId, recipient: Types.ObjectId) => {
    return await notificationService.createOrUpdateNotification(fromId, recipient);
}

