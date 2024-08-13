import User, { IUser } from "../models/userModel";

const createUser = async (
  email: string,
  password: string,
  phoneNumber: string
): Promise<IUser> => {
  const user = new User({ email, password, phoneNumber });
  return await user.save();
};

const getUsers = async (): Promise<IUser[]> => {
  return await User.find().exec();
};

const getUserById = async (userId: string): Promise<IUser | null> => {
  return await User.findById(userId).exec();
};

const getUserByPhoneNumber = async (
  phoneNumber: string
): Promise<IUser | null> => {
  return await User.findOne({ phoneNumber }).exec();
};

const getUserByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email }).exec();
};

const updateUser = async (
  userId: string,
  updateData: Partial<IUser>
): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(userId, updateData, { new: true }).exec();
};

const deleteUser = async (userId: string): Promise<IUser | null> => {
  return await User.findByIdAndDelete(userId).exec();
};

export {
  createUser,
  getUsers,
  getUserById,
  getUserByPhoneNumber,
  getUserByEmail,
  updateUser,
  deleteUser,
};
