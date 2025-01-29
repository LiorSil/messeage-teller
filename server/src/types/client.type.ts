import { IContact } from "../interfaces/model.interfaces";

export type ClientSubContact = Pick<
  IContact,
  "_id" | "name" | "phoneNumber" | "avatar"
>;
