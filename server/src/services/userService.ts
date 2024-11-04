import userRepo from "../repositories/userRepo";
import jwt from 'jsonwebtoken';
import contactService from "./contactService";
import {IContact, IUser} from "../models/model.interfaces";

const registerUser = async (
    email: string,
    password: string,
    phoneNumber: string
): Promise<{ user: IUser; contact: IContact }> => {
    const user = await userRepo.createUser(email, password, phoneNumber);
    const contact = await contactService.createContact({
        name: email,
        phoneNumber,
        createdAt: new Date().toISOString(),
    });
    return {user, contact};
};

const loginUser = async (email: string, password: string) => {
    try {
        // Fetch user by email
        const user = await userRepo.getUserByEmail(email);

        // Check if user exists and if the password is correct
        if (!user || !(await user.comparePassword(password))) {
            return {status: 401, data: {message: "Invalid email or password"}};
        }

        // Generate JWT token
        const token = jwt.sign(
            {userId: user._id, phoneNumber: user.phoneNumber},
            process.env.JWT_SECRET!,
            {expiresIn: "1h"}
        );

        return {status: 200, data: {token}};
    } catch (error: any) {
        return {status: 400, data: {message: error.message}};
    }
};


export default {
    registerUser,
    loginUser,
};
