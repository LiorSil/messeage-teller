import {Request, Response} from "express";
import contactService from "../services/contactService";
import ns from "../services/notificationService";
import {Types} from "mongoose";
import {IContact, ISubContact} from "../models/model.interfaces";


const handleError = (res: Response, error: any) =>
    res.status(400).json({message: error.message});

const createContact = async (req: Request, res: Response) => {
    const createdContact = await contactService.createContact(req.body);
    try {
        if (!createdContact)
            return res.status(409).json({message: "Contact already exists"});
        res.status(201).json(createdContact);

    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
};

const getContact = async (req: Request, res: Response) => {
    const {contact} = await req.body;
    await buildClientContactData(contact, res);
};

const fetchSubContact = async (
    subContactId: Types.ObjectId,
    notificationFromIds: Set<string>
) => {
    const fullSubContact = await contactService.getContactById(subContactId);
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


const findContactsByQuery = async (req: Request, res: Response) => {
    try {
        const {contact} = req.body;
        const {query} = req.params;

        const contacts = await contactService.getContactsByQuery(query)
        const contactsWithoutLoggedInUser = contacts.filter((c) => !c._id.equals(contact._id));
        const contactsWithoutExistingSubContacts = contactsWithoutLoggedInUser.filter(c =>
            !contact.subContacts.find((subContact: ISubContact) => subContact.subContactId.equals(c._id))
        );
        const safeContacts = contactsWithoutExistingSubContacts.map(({_id, name, phoneNumber, avatar}) => ({
            _id,
            name,
            phoneNumber,
            avatar,
            lastMessage: "",
        }));

        res.status(200).json(safeContacts);
    } catch (error) {
        handleError(res, error);
    }
};

const addSubContact = async (req: Request, res: Response) => {
    try {
        const {contact, subContactId} = req.body;

        const contactWasUpdated = await contactService.addSubContact(contact._id, subContactId);
        if (!contactWasUpdated)
            return res.status(404).json({message: "Sub contact not found"});
        await buildClientContactData(contact, res)

    } catch (error) {
        handleError(res, error);
    }
};

const updateProfile = async (req: Request, res: Response) => {
    try {
        const {contact} = req.body;

        if (!contact) return res.status(404).json({message: "Contact not found"});

        Object.assign(contact, req.body);
        await contactService.updateContact(contact._id, contact);

        res.status(200).json(contact);
    } catch (error) {
        handleError(res, error);
    }
};

const buildClientContactData = async (contact: IContact, res: Response) => {
    try {
        // Fetch active notifications for the contact
        const notifications = await ns.getActiveNotifications(contact._id)
        // Create a set of notification sender IDs
        const notificationFromIds: Set<string> = new Set(
            notifications.map(({fromId}) => fromId.toString())
        );
        // Fetch all sub-contacts details asynchronously
        const subContacts = await Promise.all(
            contact.subContacts.map((subContact: ISubContact) =>
                fetchSubContact(subContact.subContactId, notificationFromIds)
            )
        );

        // Send the response in the specified format
        res.status(200).json({
            _id: contact._id,
            name: contact.name,
            avatar: contact.avatar,
            phoneNumber: contact.phoneNumber,
            createdAt: contact.createdAt,
            subContacts,
        });
    } catch (error) {
        // Handle any errors that may occur during data fetching
        res.status(500).json({message: 'Error fetching contact data', error});
    }
};


export default {
    createContact,
    getContact,
    findContactsByQuery,
    addSubContact,
    updateProfile,
};
