import catchAsync from "../helpers/catchAsync";
import { Request, Response } from "express";
import {
  addBookToCatalogue,
  removeBookFromCatalogue,
  fetchBooks,
  fetchSingleBook,
  borrowABook
} from "../services/book.service";
import httpStatus from "http-status";
import { IFilterRequest, IFilter } from "../interfaces/book.interface";

const addBook = catchAsync(async (req: Request, res: Response) => {
  await addBookToCatalogue(req.body);
  return res.status(httpStatus.CREATED).send({
    status: "success",
    message: "Book Added"
  });
});

// Fetch books that are not available for borrowing
const getBorrowedBooks = catchAsync(async (req: Request, res: Response) => {
  const book = await fetchBooks({ availability: false });
  return res.status(httpStatus.OK).send({
    status: "success",
    data: book,
  });
});

// Fetch All List of books with filters
const getBooks = catchAsync(async (req: IFilterRequest, res: Response) => {
  let match: IFilter = {};

  if (req.query.category) {
    match.category = req.query.category;
  }

  if (req.query.publisher) {
    match.publisher = req.query.publisher;
  }

  const book = await fetchBooks(match);
  return res.status(httpStatus.OK).send({
    status: "success",
    data: book,
  });
});

const getOneBook = catchAsync(async (req: Request, res: Response) => {
  const book = await fetchSingleBook(req.params.id);
  res.status(httpStatus.OK).send({
    status: "success",
    data: book,
  });
});

const borrowBook = catchAsync(async (req: Request, res: Response) => {
  const book = await borrowABook(req.params.id, req.body.duration);
  res.status(httpStatus.OK).send({
    status: "success",
    data: book
  });
});

const removeBook = catchAsync(async (req: Request, res: Response) => {
  await removeBookFromCatalogue(req.params.id);
  res.status(httpStatus.OK).send({
    status: "success",
    message: "Book Deleted",
  });
});

export {
  addBook,
  removeBook,
  getOneBook,
  getBooks,
  getBorrowedBooks,
  borrowBook,
};
