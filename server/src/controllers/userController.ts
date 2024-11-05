import {Request, Response} from "express";
import userService from "../services/userService";

const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getUsers();
        res.status(200).json(users);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

//TODO: implement generateOtp
//TODO: implement verifyOtp

export {getUsers};
