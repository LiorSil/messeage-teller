import {
  createUser,
  getUsers,
  getUserByEmail,
  updateUser,
  deleteUser,
  getUserById,
  getUserByPhoneNumber,
} from "../repositories/userRepo";
import { IUser, IContact } from "../models/model.interfaces";
import contactService from "./contactService";

const registerUser = async (
  email: string,
  password: string,
  phoneNumber: string
): Promise<{ user: IUser; contact: IContact }> => {
  const user = await createUser(email, password, phoneNumber);
  const contact = await contactService.createContact({
    name: email,
    phoneNumber,
    createdAt: new Date().toISOString(),
  });

  // Return both the user and the contact
  return { user, contact };
};

const findUsers = async (): Promise<IUser[]> => {
  return await getUsers();
};

const getUser = async (userId: string): Promise<IUser | null> => {
  return await getUserById(userId);
};

const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return await getUserByEmail(email);
};

const findUserByPhoneNumber = async (
  phoneNumber: string
): Promise<IUser | null> => {
  return await getUserByPhoneNumber(phoneNumber);
};

const updateUserData = async (
  userId: string,
  updateData: Partial<IUser>
): Promise<IUser | null> => {
  return await updateUser(userId, updateData);
};

const removeUser = async (userId: string): Promise<IUser | null> => {
  return await deleteUser(userId);
};

export {
  registerUser,
  findUsers,
  getUser,
  findUserByEmail,
  findUserByPhoneNumber,
  updateUserData,
  removeUser,
};
