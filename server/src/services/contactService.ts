import contactRepo from "../repositories/contactRepo";
import {IContact, ISubContact} from "../models/model.interfaces";
import {Types} from "mongoose";
import notificationRepo from "../repositories/notificationRepo";

const createContact = async (
    contactData: Partial<IContact>
): Promise<IContact> => {
    return await contactRepo.createContact(contactData);
};

const getContactsByQuery = async (query: string): Promise<IContact[]> => {
    return await contactRepo.getContactsByQuery(query);
}


const updateContact = async (
    contactId: Types.ObjectId | string,
    updateData: Partial<IContact>
): Promise<IContact | null> => {
    return await contactRepo.updateContact(contactId, updateData);
};

const addSubContact = async (
    contactId: Types.ObjectId,
    subContactId: Types.ObjectId
): Promise<IContact | null> => await contactRepo.addSubContact(contactId, subContactId);


const fetchSubContact = async (
    subContactId: Types.ObjectId | string,
    notificationFromIds: Set<string>
) => {
    const fullSubContact = await contactRepo.getContactById(subContactId);
    if (!fullSubContact) return null;

    const {_id, name, phoneNumber, avatar} = fullSubContact;


    return {
        _id,
        name,
        phoneNumber,
        avatar,
        isIncomingMessage: notificationFromIds.has(_id.toString()) || false,
    };
};


const buildClientContactData = async (contact: IContact) => {
    try {
        // Fetch active notifications for the contact
        const notifications = await notificationRepo.findNotificationsForRecipient(contact._id);
        // Create a set of notification sender IDs
        const notificationFromIds = new Set(
            notifications.map(({fromId}) => fromId.toString())
        );

        // Fetch all sub-contacts details asynchronously
        const subContacts = await Promise.all(
            contact.subContacts.map((subContact: ISubContact) =>
                fetchSubContact(subContact.subContactId, notificationFromIds)
            )
        );
        // Return the data in the specified format
        return {
            status: 200,
            data: {
                _id: contact._id,
                name: contact.name,
                avatar: contact.avatar,
                phoneNumber: contact.phoneNumber,
                createdAt: contact.createdAt,
                subContacts,
            },

        };
    } catch (error) {
        return {
            status: 500,
            data: {message: 'Error fetching contact data', error},
        };
    }
};

const findContactsByQuery = async (loggedInContact: IContact, query: string) => {
    const contacts = await getContactsByQuery(query);
    return contacts
        .filter(foundContact =>
            !foundContact._id.equals(loggedInContact._id) &&
            !loggedInContact.subContacts.some(
                (subContact: ISubContact) => subContact.subContactId.equals(foundContact._id))
        )
        .map(({_id, name, phoneNumber, avatar}) => ({
            _id,
            name,
            phoneNumber,
            avatar,
            //TODO: Add last message to the response
            lastMessage: "",
        }));
};

export default {
    createContact,
    getContactsByQuery,
    updateContact,
    buildClientContactData,
    addSubContact,
    findContactsByQuery,
}