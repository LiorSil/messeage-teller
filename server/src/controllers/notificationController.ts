import {Request, Response} from "express";
import notificationService from "../services/notificationService";


const pullNotification = async (req: Request, res: Response) => {
    const {contactId, subContactNotification} = req.body;
    const result = await notificationService.pullNotification(contactId, subContactNotification);
    res.status(200).json(result);
};

export default {
    pullNotification
};
