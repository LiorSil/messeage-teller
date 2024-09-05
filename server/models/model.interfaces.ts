import { Document, Schema, Types } from "mongoose";

interface IMessage extends Document {
  fromId: Types.ObjectId;
  toId: Types.ObjectId;
  sentTD: Date;
  read: boolean;
  readTD: Date;
  messageText: string;
}

interface IChat extends Document {
  participants: Schema.Types.ObjectId[];
  messages: IMessage[];
}

interface ISubContact extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  phoneNumber: string;
  lastMessage: string;
  avatar: string;
}

interface IContact extends Document {
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

export { IMessage, IChat, ISubContact, IContact, IUser };
