import catchAsync from "../helpers/catchAsync";
import { Request, Response } from "express";
import { fetchAllAvailableBooks, fetchOneBook, borrowBook } from "../services/book.service";
import httpStatus from "http-status";
import { IFilter, IFilterRequest } from '../interfaces/book.interface';

const getBooks = catchAsync(async (req: IFilterRequest, res: Response) => {
   let match: IFilter = {
    category: "",
    publisher: ""
   };

  if (req.query.category) {
    match.category = req.query.category;
  }

  if (req.query.publisher) {
    match.publisher = req.query.publisher;
  }

  const books = await fetchAllAvailableBooks(match);
  res.status(httpStatus.OK).send(books);
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
    const book = await fetchOneBook(req.params.id);
    res.status(httpStatus.OK).send(book);
});

const borrowABook = catchAsync(async (req: Request, res: Response) => {
    const { duration, user_id, book_id } = req.body;
    await borrowBook(duration, user_id, book_id);
    res.status(httpStatus.OK).send("Book borrowed Successfully");
});

export { getBooks, getSingleBook, borrowABook };
