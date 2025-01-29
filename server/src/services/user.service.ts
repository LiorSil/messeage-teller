import { PhoneNumber } from "../types/regex.type";
import { IUser } from "../interfaces/model.interfaces";
import jwt from "jsonwebtoken";
import { createContact } from "../repositories/contact.repository";
import {
  createUser,
  getUserByEmail,
  getUserByPhoneNumber,
  getUsers,
} from "../repositories/user.repository";

export const registerUserService = async (
  email: Pick<IUser, "email">,
  password: Pick<IUser, "password">,
  phoneNumber: PhoneNumber
) => {
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return { status: 400, data: { message: "User already exists" } };
    }
    const existingPhoneNumber = await getUserByPhoneNumber(phoneNumber);
    if (existingPhoneNumber) {
      return { status: 400, data: { message: "Phone number already exists" } };
    }

    const user = await createUser(email, password, phoneNumber);
    const contact = await createContact({
      name: email.toString(),
      phoneNumber,
      createdAt: new Date().toISOString(),
    });
    return { status: 201, data: { user, contact } };
  } catch (error: any) {
    return { status: 400, data: { message: error.message } };
  }
};

export const loginUserService = async (
  email: Pick<IUser, "email">,
  password: string
) => {
  try {
    // Fetch user by email
    const user = await getUserByEmail(email);

    // Check if user exists and if the password is correct
    if (!user || !(await user.comparePassword(password))) {
      return { status: 401, data: { message: "Invalid email or password" } };
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, phoneNumber: user.phoneNumber },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return { status: 200, data: { token } };
  } catch (error: any) {
    return { status: 400, data: { message: error.message } };
  }
};
export const getUsersService = async () => {
  try {
    return await getUsers();
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch users");
  }
};
