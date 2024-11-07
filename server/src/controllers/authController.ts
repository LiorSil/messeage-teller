import {Request, Response} from "express";
import userService from "../services/userService";

const register = async (req: Request, res: Response) => {
    try {
        const {email, password, phoneNumber} = req.body;

        const newUser = await userService.registerUser(email, password, phoneNumber);
        if(newUser.status === 201)
            res.status(201).json({message: "User registered successfully", user: newUser.data});
        else
            res.status(400).json({message: newUser.data.message});
    } catch (err: any) {
        res.status(400).json({message: err.message});
    }
};

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const result = await userService.loginUser(email, password);
    res.status(result.status).json(result.data);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

//TODO: implement generateOtp
//TODO: implement verifyOtp

export {register, login};
