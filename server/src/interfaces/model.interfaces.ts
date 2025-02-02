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
  subContactId: Types.ObjectId;
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
  password: string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
  phoneNumber: PhoneNumber;
}

interface INotification {
  _id: Types.ObjectId;
  contactId: Types.ObjectId;
  contactNotifications: Array<Types.ObjectId>;
}

export { IMessage, IChat,  ISubContact, IContact,  IUser, INotification };
