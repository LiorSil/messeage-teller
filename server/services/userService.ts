import {
  createUser,
  getUsers,
  getUserByEmail,
  updateUser,
  deleteUser,
  getUserById,
} from "../repos/userRepo";
import { IUser } from "../models/userModel";
import { IContact } from "../models/contactModel";
import { createContact } from "../services/contactService";

const registerUser = async (
  email: string,
  password: string,
  phoneNumber: string
): Promise<{ user: IUser; contact: IContact }> => {
  const user = await createUser(email, password, phoneNumber);
  const contact = await createContact({
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
  updateUserData,
  removeUser,
  
};
