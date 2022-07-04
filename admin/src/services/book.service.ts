import ApiError from "../helpers/ApiError";
import Book from "../models/book.model";
import httpStatus from "http-status";
import { IBook, IFilter } from "../interfaces/book.interface";

const addBookToCatalogue = async (bookBody: IBook): Promise<IBook> => {
  try {
    const book = await Book.create(bookBody);
    return book;
  } catch (error) {
    console.log(error);
    throw new ApiError(httpStatus.BAD_REQUEST, "Something went wrong");
  }
};

// Get All Available books
const fetchBooks = async (match: IFilter): Promise<IBook[]> => {
  const books = await Book.find({ availability: true, ...match });
  return books;
};

const fetchSingleBook = async (bookId: string): Promise<IBook> => {
  const book = await Book.findOne({ availability: true, _id: bookId });
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book does not exist");
  }
  return book;
};

const borrowABook = async (bookId: string, duration: number): Promise<IBook> => {
  try {
    const today = new Date();
    const available_date = today.setDate(today.getDate() + duration);

    const book = await Book.findOneAndUpdate(
      { _id: bookId, availability: true },
      { availability: false, availDate: available_date },
      { new: true }
    );
    if (!book) {
      throw new ApiError(httpStatus.NOT_FOUND, "Unable to borrow");
    }
    return book;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Something went wrong");
  }
};

const removeBookFromCatalogue = async (bookId: string): Promise<void> => {
  try {
    await Book.deleteOne({ _id: bookId });
  } catch (error) {
    console.log(error);
    throw new ApiError(httpStatus.BAD_REQUEST, "Unable to delete");
  }
};

export {
  addBookToCatalogue,
  removeBookFromCatalogue,
  fetchBooks,
  fetchSingleBook,
  borrowABook
};
