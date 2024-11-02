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
  notification: Types.ObjectId[];
}
interface ISubContact {
  subContactId: Types.ObjectId;
  selected: boolean;
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

interface INotification extends Document {
  fromId: Types.ObjectId;
  recipients: Types.ObjectId[];
}


export { IMessage, IChat,  ISubContact, IContact,  IUser, INotification };
