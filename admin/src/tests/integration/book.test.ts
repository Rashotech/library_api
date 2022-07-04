import { IBook } from './../../interfaces/book.interface';
import supertest from "supertest";
import app from "../../app";
import setupTestDB from "../utils/setupTestDB";
import Book from '../../models/book.model';

// Set up Test Database
setupTestDB();

// Test Suites
describe("Book routes", () => {
  describe("POST /api/books/add", () => {
    let bookData: IBook;

    beforeEach(async () => {
      bookData = {
        "title": "good Boys",
        "author": "Soyinka",
        "category": "fiction",
        "publisher": "Rashotech Inc."
      };
    });

    test("should return 201 if book is added successfully", async () => {
      const res = await supertest(app)
        .post("/api/books/add")
        .send(bookData)
        .expect(201);

      expect(res.body).toEqual({
        status: "success",
        message: "Book Added"
      });
    });

    test("should return 422 error if required input is not sent", async () => {
      await supertest(app)
        .post("/api/books/add")
        .send({})
        .expect(422);
    });
  });

  describe("GET /api/books", () => {
    let bookData: IBook;

    beforeEach(async () => {
      bookData = {
        "title": "good Boys",
        "author": "Soyinka",
        "category": "fiction",
        "publisher": "Rashotech Inc."
      };
    });

    test("should return 200 if all books are fetched successfully", async () => {
      await Book.create(bookData);
      const res = await supertest(app)
        .get("/api/books")
        .expect(200);

      expect(res.body).toEqual({
        status: "success",
        data: [{_id: expect.anything(), availability: true, __v: 0, ...bookData}],
      });
    });
  });

  describe("GET /api/books/:id", () => {
    let bookData: IBook;

    beforeEach(async () => {
      bookData = {
        "title": "good Boys",
        "author": "Soyinka",
        "category": "fiction",
        "publisher": "Rashotech Inc."
      };
    });

    test("should return 200 if books is fetched by id successfully", async () => {
      const book = await Book.create(bookData);
      const res = await supertest(app)
        .get(`/api/books/${book._id}`)
        .expect(200);

      expect(res.body).toEqual({
        status: "success",
        data: { _id: expect.anything(), availability:  book.availability, __v: 0, ...bookData}
      });
    });
  });
});
