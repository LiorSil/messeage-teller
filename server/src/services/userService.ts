import userRepo from "../repositories/userRepo";
import { IUser, IContact } from "../models/model.interfaces";
import contactService from "./contactService";

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

  // Return both the user and the contact
  return { user, contact };
};

const findUsers = async (): Promise<IUser[]> => {
  return await userRepo.getUsers();
};

const getUser = async (userId: string): Promise<IUser | null> => {
  return await userRepo.getUserById(userId);
};

const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return await userRepo.getUserByEmail(email);
};

const findUserByPhoneNumber = async (
  phoneNumber: string
): Promise<IUser | null> => {
  return await userRepo.getUserByPhoneNumber(phoneNumber);
};

const updateUserData = async (
  userId: string,
  updateData: Partial<IUser>
): Promise<IUser | null> => {
  return await userRepo.updateUser(userId, updateData);
};

const removeUser = async (userId: string): Promise<IUser | null> => {
  return await userRepo.deleteUser(userId);
};

export default {
  registerUser,
  findUsers,
  getUser,
  findUserByEmail,
  findUserByPhoneNumber,
  updateUserData,
  removeUser,
};
