import { Types } from "mongoose";
import { IContact } from "../interfaces/model.interfaces";

export type ClientSubContact = Pick<
  IContact,
  "_id" | "name" | "phoneNumber" | "avatar"
>;

// export type ContactSubContact = {
  
//   subContactId: Types.ObjectId;
//   lastMessageTime: Date;
//   isIncomingMessage: boolean;
// } & ClientSubContact;

export interface ContactSubContact {
    _id: Types.ObjectId;
    name: string;
    phoneNumber: string;
    avatar?: string; // Avatar might be optional
    lastMessageTime?: Date; // Or whatever type it is
    isIncomingMessage: boolean;
}
