import userModel from "../models/user.model";
import { IUser } from "../interfaces/model.interfaces";
import mongoose from 'mongoose';

/**
 * Create a new user.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @param {string} phoneNumber - User's phone number.
 * @returns {Promise<IUser>} - The created user.
 */
export const createUser = async (
  email: string,
  password: string,
  phoneNumber: string
): Promise<IUser> => {
  try {
    const user = new userModel({ email, password, phoneNumber });
    return await user.save();
  } catch (error: any) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

/**
 * Get all users.
 * @returns {Promise<IUser[]>} - List of all users.
 */
export const getUsers = async (): Promise<IUser[]> => {
  try {
    return await userModel.find().exec();
  } catch (error: any) {
    throw new Error(`Error fetching users:${error.message}`);
  }
};

/**
 * Get a user by ID.
 * @param {string} userId - User's ID.
 * @returns {Promise<IUser | null>} - The user with the given ID or null if not found.
 */
export const getUserById = async (userId: string): Promise<IUser | null> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('Invalid user ID');
    }
    return await userModel.findById(userId).exec();
  } catch (error: any) {
    throw new Error(`Error fetching user by ID:${error.message}`);
  }
};

/**
 * Get a user by phone number.
 * @param {string} phoneNumber - User's phone number.
 * @returns {Promise<IUser | null>} - The user with the given phone number or null if not found.
 */
export const getUserByPhoneNumber = async (
  phoneNumber: string
): Promise<IUser | null> => {
  try {
    return await userModel.findOne({ phoneNumber }).exec();
  } catch (error: any) {
    throw new Error(`Error fetching user by phone number:${error.message}`);
  }
};

/**
 * Get a user by email.
 * @param {string} email - User's email.
 * @returns {Promise<IUser | null>} - The user with the given email or null if not found.
 */
export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  try {
    return await userModel.findOne({ email }).exec();
  } catch (error: any) {
    throw new Error(`Error fetching user by email:${error.message}`);
  }
};

/**
 * Update a user's information.
 * @param {string} userId - User's ID.
 * @param {Partial<IUser>} updateData - Data to update.
 * @returns {Promise<IUser | null>} - The updated user or null if not found.
 */
export const updateUser = async (
  userId: string,
  updateData: Partial<IUser>
): Promise<IUser | null> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('Invalid user ID');
    }
    return await userModel.findByIdAndUpdate(userId, updateData, { new: true }).exec();
  } catch (error: any) {
    throw new Error(`Error updating user:${error.message}`);
  }
};

/**
 * Delete a user by ID.
 * @param {string} userId - User's ID.
 * @returns {Promise<IUser | null>} - The deleted user or null if not found.
 */
export const deleteUser = async (userId: string): Promise<IUser | null> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('Invalid user ID');
    }
    return await userModel.findByIdAndDelete(userId).exec();
  } catch (error: any) {
    throw new Error(`Error deleting user:${error.message}`);
  }
};