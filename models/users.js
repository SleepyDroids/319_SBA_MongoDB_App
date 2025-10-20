import mongoose from "mongoose";
import { boolean } from "webidl-conversions";

const prefsSchema = new mongoose.Schema(
  {
    platforms: { type: [String], default: [] },
    keywords: { type: [String], default: [] },
  },
  { _id: false } 
);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 3, // "bob"
      unique: true, // prevent multiple "bobs"
    },
    password: {
      type: String,
      required: true,
    },
    isOnline: {
      type: Boolean,
      default: false
    },
    prefs: {
      type: prefsSchema,
      default: () => ({}),
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("userInfo", userSchema, "users");

export default Users;
