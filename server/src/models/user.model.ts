import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import {phoneNumberRegex} from "../utils/regex";
import { IUser } from "../interfaces/model.interfaces";

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v: string) => phoneNumberRegex.test(v),
        message: (props) =>
          `${props.value} is not a valid phone number! It should start with "05" and be 10 digits long.`,
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = model<IUser>("User", userSchema, "users");

export default User;
