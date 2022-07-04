import catchAsync from "../helpers/catchAsync";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { usersList } from "../services/user.service";

// Fetch users and the books they have borrowed
const getUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await usersList();
  return res.status(httpStatus.OK).send(users);
});

export { getUsers };
