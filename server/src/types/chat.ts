import {Types} from "mongoose";

export interface mappedChatParticipants {
    subContactId: Types.ObjectId;
    lastMessageTime: Date;
}