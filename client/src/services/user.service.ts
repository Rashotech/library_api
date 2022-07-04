import ApiError from "../helpers/ApiError";
import User from "../models/user.model";
import httpStatus from "http-status";
import { IUser } from "../interfaces/user.interface";

const UserRegistration = async (userBody: IUser): Promise<IUser> => {
  const info = await User.findOne({ email: userBody.email });
  if (info) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User with this email already exist");
  }
  const user = await User.create(userBody);
  return user;
};

const fetchAllUsers = async (): Promise<IUser[]> => {
  const user = await User.find();
  return user;
};

export { UserRegistration, fetchAllUsers };
