import { Document, Types } from "mongoose";

interface IMessage extends Document {
  fromId: Types.ObjectId;
  toId: Types.ObjectId;
  sentTD?: Date;
  read?: boolean;
  readTD?: Date;
  content: string;
}

interface IChat extends Document {
  _id: Types.ObjectId;
  participants: Types.ObjectId[];
  messages: IMessage[];
}
interface ISubContact {
  subContactId: Types.ObjectId;
  selected: boolean;
  lastMessageTime: Date;
}

interface IContact extends Document {
  _id: Types.ObjectId;
  name: string;
  avatar: string;
  phoneNumber: string;
  subContacts: ISubContact[];
  status?: string;
  createdAt?: string;
  chats: Types.ObjectId[];
}

interface IUser extends Document {
  email: string;
  password: string;
  phoneNumber: string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

interface INotification {
  contactId: Types.ObjectId;
  contactNotifications: Types.ObjectId[];
}

export { IMessage, IChat,  ISubContact, IContact,  IUser, INotification };
