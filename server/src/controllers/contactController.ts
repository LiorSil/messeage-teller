import {Request, Response} from "express";
import contactService from "../services/contactService";

const createContact = async (req: Request, res: Response) => {
    try {
        const contactData = req.body;
        const createdContact = await contactService.createContact(contactData);
        if (!createdContact)
            return res.status(409).json({message: "Contact already exists"});
        res.status(201).json(createdContact);

    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
};

const getContact = async (req: Request, res: Response) => {
    try {
        const {contact} = await req.body;
        const result = await contactService.buildClientContactData(contact);
        res.status(result.status).json(result.data);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};


const findContactsByQuery = async (req: Request, res: Response) => {
    try {
        const {contact} = req.body;
        const {query} = req.params;
        const safeContacts = await contactService.findContactsByQuery(contact, query);
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
