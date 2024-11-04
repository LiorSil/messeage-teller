import Contact from "../models/contactModel";
import {IContact} from "../models/model.interfaces";
import {Types} from "mongoose";
import {phoneNumberSchema} from "./validation";

const createContact = async (
    contactData: Partial<IContact>
): Promise<IContact> => {
    const contact = new Contact(contactData);
    return await contact.save();
};

const getContactById = async (
    contactId: Types.ObjectId | string
): Promise<IContact | null> => {
    return await Contact.findById(contactId).exec();
};

const getContactByPhoneNumber = async (phoneNumber: string) => {
    try {
        return await Contact.findOne({phoneNumber: phoneNumber});
    } catch (error) {
        console.error("Error finding contact by phone number:", error);
        return null;
    }
};

const getContactsByName = async (name: string): Promise<IContact[]> => {
    return await Contact.find({name: {$regex: name, $options: "i"}}).exec();
};


const getContactsByQuery = async (query: string): Promise<IContact[]> => {
    const isPhoneNumber = await phoneNumberSchema
        .validate(query)
        .then(() => true)
        .catch(() => false);

    const searchField = isPhoneNumber
        ? {phoneNumber: {$regex: query, $options: "i"}}
        : {name: {$regex: query, $options: "i"}};
    return await Contact.find(searchField).exec();

};


const getContacts = async (): Promise<IContact[]> => {
    return await Contact.find().exec();
};
const updateContact = async (
    contactId: Types.ObjectId | string,
    updateData: Partial<IContact>
): Promise<IContact | null> => {
    return await Contact.findByIdAndUpdate(contactId, updateData, {
        new: true,
    }).exec();
};

const addSubContact = async (contactId: Types.ObjectId, subContactId: Types.ObjectId
): Promise<IContact | null> => {
    const subContactExists = await Contact.findById(subContactId).exec();
    if (!subContactExists)
        throw new Error("Sub-contact does not exist");
    return await Contact.findByIdAndUpdate(
        contactId,
        {
            $addToSet: {subContacts: {subContactId: subContactId}}
        },
        {new: true, upsert: true} //
    ).exec();
}

const deleteContact = async (
    contactId: Types.ObjectId | string
): Promise<IContact | null> => {
    return await Contact.findByIdAndDelete(contactId).exec();
};

export default {
    createContact,
    getContactById,
    getContactByPhoneNumber,
    getContactsByName,
    getContacts,
    updateContact,
    deleteContact,
    addSubContact,
    getContactsByQuery,
};