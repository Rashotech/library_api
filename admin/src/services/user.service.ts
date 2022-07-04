import ApiError from "../helpers/ApiError";
import httpStatus from "http-status";
import { IBook } from "../interfaces/book.interface";
import { HttpClient } from "../helpers/HttpClient";
import configs from "../config/constants";

const usersList = async (): Promise<IBook> => {
  try {
    const users = await new HttpClient(configs.client_url + `/users`).get<any>(
      ""
    );
    return users;
  } catch (error) {
    console.log(error);
    throw new ApiError(httpStatus.BAD_REQUEST, "Could get users");
  }
};

export { usersList };
