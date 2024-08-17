import { Schema, model, Document } from "mongoose";
import phoneNumberRegex from "../utils/phoneNumberRegex";

interface ISubContact extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  phoneNumber: string;
}

interface IContact extends Document {
  name: string;
  phoneNumber: string;
  contacts: ISubContact[];
  status?: string;
  createdAt?: string;
}

const subContactSchema = new Schema<ISubContact>(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => phoneNumberRegex.test(v),
        message: (props) =>
          `${props.value} is not a valid phone number! It should start with "05" and be 10 digits long.`,
      },
    },
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
    contacts: [subContactSchema],
  },
  {
    timestamps: true,
  }
);

const Contact = model<IContact>("Contact", contactSchema, "contacts");

export default Contact;
export { IContact, ISubContact };
