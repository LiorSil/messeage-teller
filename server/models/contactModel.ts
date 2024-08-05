import { Schema, model, Document } from "mongoose";
import phoneNumberRegex from "../utils/phoneNumberRegex";

interface IContact extends Document {
  contacts: IContact["_id"][];
  name: string;
  phoneNumber: string;
  status?: string;
  createdAt?: string;
}

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
    contacts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Contact",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Contact = model<IContact>("Contact", contactSchema, "contacts");

export default Contact;
export { IContact };
