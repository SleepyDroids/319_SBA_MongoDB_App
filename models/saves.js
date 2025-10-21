import mongoose from "mongoose";
import { ObjectId } from "bson";
import { Types } from "mongoose";

const savesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    gameTitle: {
      type: String,
    },
    screenshot: {
      type: String,
    },
    game_id: {
      type: ObjectId,
      required: true
    },
    user_id: {
      type: ObjectId,
      required: true
    },
    uploaded: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);
// name of model, name of schema, name of collection (defaults to name of model if not provided)
const Saves = mongoose.model("savedGameFiles", savesSchema, "saves");

export default Saves;
