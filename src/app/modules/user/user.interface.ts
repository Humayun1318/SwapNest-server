/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export type TUser = {
  _id?: string;
  id: string;
  name: string;
  email?: string;
  phone?: string;
  password: string;
  role: UserRole;
  imgUrl?: string;
  isBlocked: boolean;
  isDeleted: boolean;
};

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isUserExistsByCustomEmail(email: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}
