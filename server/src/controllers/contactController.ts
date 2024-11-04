import {Request, Response} from "express";
import contactService from "../services/contactService";
import {ISubContact} from "../models/model.interfaces";
import contactRepo from "../repositories/contactRepo";


const createContact = async (req: Request, res: Response) => {
    const contactData = req.body;
    const createdContact = await contactRepo.createContact(contactData);
    try {
        if (!createdContact)
            return res.status(409).json({message: "Contact already exists"});
        res.status(201).json(createdContact);

    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
};

const getContact = async (req: Request, res: Response) => {
    console.log("req.body", req.body);
    try {
        const {contact} = await req.body;
        const result = await contactService.buildClientContactData(contact);
        res.status(result.status).json(result.data);
        console.log("result.data", result.data);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};


const findContactsByQuery = async (req: Request, res: Response) => {
    try {
        const {contact} = req.body;
        const {query} = req.params;

        const contacts = await contactRepo.getContactsByQuery(query)
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
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

const addSubContact = async (req: Request, res: Response) => {
    try {
        const {contact, subContactId} = req.body;

        const contactWasUpdated = await contactService.addSubContact(contact._id, subContactId);
        if (!contactWasUpdated)
            return res.status(404).json({message: "Sub contact not found"});
        const result = await contactService.buildClientContactData(contact);
        res.status(result.status).json(result.data);

    } catch (error: any) {
        res.status(500).json({message: error.message});


    }
};

const updateProfile = async (req: Request, res: Response) => {
    try {
        const {contact} = req.body;

        if (!contact) return res.status(404).json({message: "Contact not found"});

        Object.assign(contact, req.body);
        await contactService.updateContact(contact._id, contact);

        res.status(200).json(contact);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};


export default {
    createContact,
    getContact,
    findContactsByQuery,
    addSubContact,
    updateProfile,
};
