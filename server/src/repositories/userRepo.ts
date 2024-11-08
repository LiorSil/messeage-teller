import userModel from "../models/userModel";
import { IUser } from "../models/model.interfaces";

export const createUser = async (
  email: string,
  password: string,
  phoneNumber: string
): Promise<IUser> => {
   const user = new userModel({ email, password, phoneNumber });
  return await user.save();
};

export const getUsers = async (): Promise<IUser[]> => {
  return await userModel.find().exec();
};

export const getUserById = async (userId: string): Promise<IUser | null> => {
  return await userModel.findById(userId).exec();
};

export const getUserByPhoneNumber = async (
  phoneNumber: string
): Promise<IUser | null> => {
  return await userModel.findOne({ phoneNumber }).exec();
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  return await userModel.findOne({ email }).exec();
};

export const updateUser = async (
  userId: string,
  updateData: Partial<IUser>
): Promise<IUser | null> => {
  return await userModel.findByIdAndUpdate(userId, updateData, { new: true }).exec();
};

export const deleteUser = async (userId: string): Promise<IUser | null> => {
  return await userModel.findByIdAndDelete(userId).exec();
};
