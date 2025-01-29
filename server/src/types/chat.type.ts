import {Types} from "mongoose";

export type mappedChatParticipants = {
    subContactId: Types.ObjectId;
    lastMessageTime: Date;
}

export type Participant = Types.ObjectId;
