import { Schema, model, Document } from "mongoose";
import phoneNumberRegex from "../utils/phoneNumberRegex";
import { ISubContact, IContact } from "./model.interfaces";

const subContactSchema = new Schema<ISubContact>(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true, // Removed unique: true
      validate: {
        validator: (v: string) => phoneNumberRegex.test(v),
        message: (props) =>
          `${props.value} is not a valid phone number! It should start with "05" and be 10 digits long.`,
      },
    },
    lastMessage: String,
    avatar: String,
  },
  { _id: true }
);

const contactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v: string) => phoneNumberRegex.test(v),
        message: (props) =>
          `${props.value} is not a valid phone number! It should start with "05" and be 10 digits long.`,
      },
    },
    avatar: {
      type: String,
      default:
        "https://plus.unsplash.com/premium_photo-1664536392779-049ba8fde933?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    subContacts: {
      type: [subContactSchema],
      // validate: {
      //   validator: function (subContacts: ISubContact[]) {
      //     const phoneNumbers = subContacts.map(
      //       (subContacts) => subContacts.phoneNumber
      //     );
      //     return phoneNumbers.length === new Set(phoneNumbers).size;
      //   },
      //   message: "A sub-contact with the same phone number already exists.",
      // },
    },
  },
  {
    timestamps: true,
  }
);

const Contact = model<IContact>("Contact", contactSchema, "contacts");

export default Contact;

