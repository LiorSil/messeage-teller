import { Document, Types } from "mongoose";

interface IMessage extends Document {
  fromId: Types.ObjectId;
  toId: Types.ObjectId;
  sentTD?: Date;
  read?: boolean;
  readTD?: Date;
  content: string;
}

export type participant = Types.ObjectId;

interface IChat extends Document {
  _id: Types.ObjectId;
  participants: participant[];
  messages: IMessage[];
} 
interface ISubContact {
  subContactId: Pick<IContact, "_id">;
  lastMessageTime: Date;
  isIncomingMessage?: boolean;
}

interface IContact extends Document {
  _id: Types.ObjectId;
  name: string;
  avatar: string;
  phoneNumber: string;
  subContacts: ISubContact[];
  status?: string;
  createdAt?: string;
}

interface IUser extends Document {
  email: string;
  password: string;
  phoneNumber: string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

interface INotification {
  contactId: Pick<IContact, "_id">;
  contactNotifications: Array<Pick<IContact, "_id">>;
}

export { IMessage, IChat,  ISubContact, IContact,  IUser, INotification };
