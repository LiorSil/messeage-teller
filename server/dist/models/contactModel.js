"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const phoneNumberRegex_1 = __importDefault(require("../utils/phoneNumberRegex"));
const contactSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (v) => phoneNumberRegex_1.default.test(v),
            message: (props) => `${props.value} is not a valid phone number! It should start with "05" and be 10 digits long.`,
        },
    },
    contacts: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Contact",
        },
    ],
}, {
    timestamps: true,
});
const Contact = (0, mongoose_1.model)("Contact", contactSchema, "contacts");
exports.default = Contact;
