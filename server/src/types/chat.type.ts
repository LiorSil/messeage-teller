import {Types} from "mongoose";

export type mappedChatParticipants = {
    subContactId: Types.ObjectId;
    lastMessageTime: Date;
}