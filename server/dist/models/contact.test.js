"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contactModel_1 = __importDefault(require("./contactModel"));
const newContact = new contactModel_1.default({
    name: "Jane Doe",
    phoneNumber: "0512345678", // Valid phone number
    contacts: [],
});
newContact
    .save()
    .then((contact) => console.log("Contact saved:", contact))
    .catch((error) => console.error("Error saving contact:", error.message));
