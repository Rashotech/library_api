import ApiError from "../helpers/ApiError";
import User from "../models/user.model";
import httpStatus from "http-status";
import { BorowedBooks } from "../interfaces/user.interface";
import configs from "../config/constants";
import { HttpClient } from "../helpers/HttpClient";
import { IFilter } from "../interfaces/book.interface";

const fetchAllAvailableBooks = async (match: IFilter): Promise<any> => {
  let meta: string = "";
  if (match.category) meta = meta + `category=${match.category}&`;
  if (match.publisher) meta = meta + `publisher=${match.publisher}`;
  try {
    const books = await new HttpClient(
      configs.admin_url + `/books?${meta}`
    ).get<any>("");
    return books;
  } catch (error) {
    console.log(error);
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Could not fetch available books"
    );
  }
};

const fetchOneBook = async (bookId: string): Promise<any> => {
  try {
    const book = await new HttpClient(
      configs.admin_url + `/books/${bookId}`
    ).get<any>("");
    return book;
  } catch (error) {
    console.log(error);
    throw new ApiError(httpStatus.BAD_REQUEST, "Could not fetch book");
  }
};

const borrowBook = async (
  duration: number,
  user_id: string,
  bookId: string
): Promise<void> => {
  try {
    const data = { duration };
    const book = await new HttpClient(
      configs.admin_url + `/books/${bookId}/borrow`
    ).post<any>("", data);
    const borrowedBook: BorowedBooks = {
      title: book.data.title,
      author: book.data.author,
      publisher: book.data.publisher,
      category: book.data.category,
    };
    await User.findOneAndUpdate({ _id: user_id }, { books: borrowedBook });
  } catch (error) {
    console.log(error);
    throw new ApiError(httpStatus.BAD_REQUEST, "Could not borrow book");
  }
};

export { fetchAllAvailableBooks, fetchOneBook, borrowBook };
