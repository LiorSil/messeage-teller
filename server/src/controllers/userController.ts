import {Request, Response} from "express";
import userRepo from "../repositories/userRepo";

const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userRepo.getUsers();
        res.status(200).json(users);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

//TODO: implement generateOtp
//TODO: implement verifyOtp

export {getUsers};
