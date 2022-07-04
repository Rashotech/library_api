import catchAsync from "../helpers/catchAsync";
import { Request, Response } from "express";
import { UserRegistration, fetchAllUsers } from "../services/user.service";
import httpStatus from "http-status";

const register = catchAsync(async (req: Request, res: Response) => {
  const user = await UserRegistration(req.body);
  return res.status(httpStatus.CREATED).send({
    status: "success",
    message: "Registration Successful"
  });
});

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await fetchAllUsers();
  res.status(httpStatus.OK).send({
    status: "success",
    data: users,
  });
});

export { register, getUsers };
