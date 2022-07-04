import { Schema, model } from "mongoose";
import { IBook } from "../interfaces/book.interface";

// A Schema corresponding to the document interface.
const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publisher: { type: String, required: true },
  category: { type: String, required: true },
  availability: { type: Boolean, default: true },
  availDate: { type: Date, required: false },
});

// Book Model
const Book = model<IBook>("Book", bookSchema);

export default Book;
