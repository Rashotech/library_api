import express from "express";
import {
  addBook,
  removeBook,
  borrowBook,
  getBooks,
  getOneBook,
  getBorrowedBooks,
} from "../controllers/book.controller";
import validate from "../middleware/validate";
import { addBookvalidation, borrowBookvalidation } from "../validations";

const router = express.Router();

router.post("/add", validate(addBookvalidation), addBook);
router.get("/borrowed", getBorrowedBooks);
router.post("/:id/borrow", validate(borrowBookvalidation), borrowBook);
router.get("/", getBooks);
router.get("/:id", getOneBook);
router.delete("/:id/remove", removeBook);


export { router as Routes };
