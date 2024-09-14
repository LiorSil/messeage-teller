import { Document, Schema, Types } from "mongoose";

interface IMessage extends Document {
  fromId: Types.ObjectId;
  toId: Types.ObjectId;
  sentTD?: Date;
  read?: boolean;
  readTD?: Date;
  content: string;
}

interface IChat extends Document {
  participants: Types.ObjectId[];
  messages: IMessage[];
}


interface IContact extends Document {
  _id: Types.ObjectId;
  name: string;
  avatar: string;
  phoneNumber: string;
  subContacts: Types.ObjectId[];
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

export { IMessage, IChat,  IContact, IUser };
