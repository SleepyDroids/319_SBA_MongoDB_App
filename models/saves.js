import mongoose from "mongoose";
import { ObjectId } from "bson";
import { Types } from "mongoose";

const savesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    gameTitle: {
      type: String,
    },
    screenshot: {
      type: String,
    },
    game_id: {
      type: ObjectId,
    },
    user_id: {
      type: ObjectId,
    },
  },
  { timestamps: true }
);
// name of model, name of schema, name of collection (defaults to name of model if not provided)
const Saves = mongoose.model("savedGameFiles", savesSchema, "saves");

export default Saves;
