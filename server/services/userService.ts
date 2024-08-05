import {
  createUser,
  getUserByEmail,
  updateUser,
  deleteUser,
  getUserById,
} from "../repos/userRepo";
import { IUser } from "../models/userModel";

const registerUser = async (
  email: string,
  password: string,
  phoneNumber: string
): Promise<IUser> => {
  return await createUser(email, password, phoneNumber);
};

const getUser = async (userId: string): Promise<IUser | null> => {
  return await getUserById(userId);
};

const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return await getUserByEmail(email);
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

export { registerUser, getUser, findUserByEmail, updateUserData, removeUser };
