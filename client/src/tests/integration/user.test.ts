import supertest from "supertest";
import app from "../../app";
import setupTestDB from "../utils/setupTestDB";
import User from "../../models/user.model";
import { IUser } from '../../interfaces/user.interface';

// Set up Test Database
setupTestDB();

// Test Suites
describe("User Registration routes", () => {
  describe("POST /api/register", () => {
    let userData: IUser;

    beforeEach(async () => {
      userData = {
        firstName: "Rasheed",
        lastName: "Ayoade",
        email: "rashotech@gmail.com"
      };
    });

    test("should return 201 if user registration is successful", async () => {
      const res = await supertest(app)
        .post("/api/register")
        .send(userData)
        .expect(201);

      expect(res.body).toEqual({
        status: "success",
        message: "Registration Successful",
      });
    });

    test("should return 422 error if required input is not sent", async () => {
      await supertest(app)
        .post("/api/register")
        .send()
        .expect(422);
    });

    test("should return 400 error if Email already linked to existing registration", async () => {
      await User.create(userData);

      const res = await supertest(app)
        .post("/api/register")
        .send(userData)
        .expect(400);

      expect(res.body).toEqual({
        code: 400,
        message: "User with this email already exist",
      });
    });
  });
});

describe("Fetch All Users routes", () => {
  describe("GET /api/users", () => {
    let userData: IUser;

    beforeEach(async () => {
      userData = {
        firstName: "Rasheed",
        lastName: "Ayoade",
        email: "rashotech@gmail.com"
      };
    });

    test("should return 200 if users fetched", async () => {
      await User.create(userData);
      const res = await supertest(app)
        .get("/api/users")
        .expect(200);

      expect(res.body).toEqual({
        status: "success",
        data: [{_id: expect.anything(), __v: 0, books: [], ...userData}],
      });
    });
  });
});
