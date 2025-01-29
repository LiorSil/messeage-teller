import { Document, Types } from "mongoose";
import { PhoneNumber } from "../types/regex.type";
import { Participant } from "../types/chat.type";

interface IMessage extends Document {
  fromId: Pick<IContact,"_id">;
  toId: Pick<IContact,"_id">;
  sentTD?: Date;
  read?: boolean;
  readTD?: Date;
  content: string;
}


interface IChat extends Document {
  _id: Types.ObjectId;
  participants: Participant[];
  messages: IMessage[];
} 
interface ISubContact {
  _id: Types.ObjectId;
  subContactId: Pick<IContact, "_id">;
  lastMessageTime: Date;
  isIncomingMessage?: boolean;
}

interface IContact extends Document {
  _id: Types.ObjectId;
  name: string;
  avatar: string;
  phoneNumber: PhoneNumber;
  subContacts: ISubContact[];
  status?: string;
  createdAt?: string;
}

interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: PhoneNumber;
  phoneNumber: PhoneNumber;
  comparePassword: (candidatePassword: PhoneNumber) => Promise<boolean>;
}

interface INotification {
  _id: Types.ObjectId;
  contactId: Pick<IContact, "_id">;
  contactNotifications: Array<Pick<IContact, "_id">>;
}

export { IMessage, IChat,  ISubContact, IContact,  IUser, INotification };
