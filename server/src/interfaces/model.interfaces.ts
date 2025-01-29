import { Document, Types } from "mongoose";

interface IMessage extends Document {
  fromId: Types.ObjectId;
  toId: Types.ObjectId;
  sentTD?: Date;
  read?: boolean;
  readTD?: Date;
  content: string;
}

export type PhoneNumber = `05${string & { length: 8 } & {
  [K in keyof any]: K extends keyof "0123456789" ? any : never;
}}`; 


export type participant = Types.ObjectId;

interface IChat extends Document {
  _id: Types.ObjectId;
  participants: participant[];
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
