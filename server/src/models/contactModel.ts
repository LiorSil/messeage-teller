import {Schema, model,  Types} from "mongoose";
import phoneNumberRegex from "../utils/phoneNumberRegex";
import {IContact} from "./model.interfaces";

// Define the contact schema
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
        subContacts: [
            {
                subContactId: {type: Types.ObjectId, ref: "Contact", required: true}, // Reference to Contact
                selected: {type: Boolean, default: false},
            }
        ],
    },
    {
        timestamps: true,
    }
);

const Contact = model<IContact>("Contact", contactSchema, "contacts");

export default Contact;
