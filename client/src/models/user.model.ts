import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/user.interface";

// A Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  books: [
    {
      title: { type: String },
      author: { type: String },
      category: { type: String },
      publisher: { type: String },
    },
  ],
});

// User Model.
const User = model<IUser>("User", userSchema);

export default User;
