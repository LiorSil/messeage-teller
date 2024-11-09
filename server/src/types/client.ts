import { Types } from "mongoose";

export type ClientSubContact = {
  _id: Types.ObjectId;
  name: string;
  phoneNumber: string;
  avatar: string;
  status?: number;
};
