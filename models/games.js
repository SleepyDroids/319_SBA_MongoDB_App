import mongoose from "mongoose";

const gamesSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  developer: {
    type: String,
  },
  publisher: {
    type: String,
  },
  ESRB: {
    type: String,
  },
  platforms: {
    type: [String],
  },
  keywords: {
    type: [String],
  },
  release_Date: {
    type: Date,
  },
});

const Games = mongoose.model("gamesLibrary", gamesSchema, "games");

export default Games;
