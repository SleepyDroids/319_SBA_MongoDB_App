import mongoose from "mongoose";

const savesSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    gameTitle: {
      type: String,
      required: true,
    },
    screenshot: {
      type: String,
    },
    game_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);
// name of model, name of schema, name of collection (defaults to name of model if not provided)
const Saves = mongoose.model("savedGameFiles", savesSchema, "saves");

export default Saves;
