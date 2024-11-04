import {Request, Response} from "express";
import userService from "../services/userService";
import jwt from "jsonwebtoken";
import userRepo from "../repositories/userRepo";

const register = async (req: Request, res: Response) => {
    try {
        const {email, password, phoneNumber} = req.body;

        const existingUser = await userRepo.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({message: "User already exists"});
        }
        const existingPhoneNumber = await userRepo.getUserByPhoneNumber(phoneNumber);
        if (existingPhoneNumber) {
            return res.status(400).json({message: "Phone number already exists"});
        }

        const user = await userService.registerUser(email, password, phoneNumber);

        res.status(201).json({message: "User registered successfully", user});
    } catch (err: any) {
        res.status(400).json({message: err.message});
    }
};

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const result = await userService.loginUser(email, password);
        console.log("result", result);
    res.status(result.status).json(result.data);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

//TODO: implement generateOtp
//TODO: implement verifyOtp

export {register, login};
