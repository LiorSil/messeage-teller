import { Schema, model, Document } from "mongoose";
import phoneNumberRegex from "../utils/phoneNumberRegex";

interface ISubContact extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  phoneNumber: string;
  lastMessage: string;
  imageUrl: string;
}

interface IContact extends Document {
  name: string;
  avatar: string;
  phoneNumber: string;
  contacts: ISubContact[];
  status?: string;
  createdAt?: string;
  imageUrl: string;
}

const subContactSchema = new Schema<ISubContact>(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: (v: string) => phoneNumberRegex.test(v),
        message: (props) =>
          `${props.value} is not a valid phone number! It should start with "05" and be 10 digits long.`,
      },
    },
    lastMessage: String,
    imageUrl: String,
  },
  { _id: true }
); // Keep _id field

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

    contacts: {
      type: [subContactSchema],
      validate: {
        validator: function (contacts: ISubContact[]) {
          const phoneNumbers = contacts.map((contact) => contact.phoneNumber);
          return phoneNumbers.length === new Set(phoneNumbers).size;
        },
        message: "A sub-contact with the same phone number already exists.",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Contact = model<IContact>("Contact", contactSchema, "contacts");

export default Contact;
export { IContact, ISubContact };
