// To seed games data, please use: node scripts/seed_games.js in the terminal

import mongoose from "mongoose";
import "dotenv/config";

// importing games model
import Games from "../models/games.js";
// importing starter data for games
import gamesData from "../data/games.js";

// connecting to mongodb w/ mongoose
const connectionString = process.env.ATLAS_URI || "";

async function addGamesData() {
  await mongoose.connect(connectionString);
  console.log("Connected to mongodb!");

  console.log("Seeding games data...");
  try {
    // clean out the collection first for resetting data
    const delGames = await Games.deleteMany({});
    console.log(`Deleted: ${delGames.deletedCount}`);
    // add the default game data
    const addGames = await Games.insertMany(gamesData);
    console.log(`Uploaded: ${addGames.length}`);
    console.log("Seeding of games data complete.");
  } catch (e) {
    console.log(e.message);
  } finally {
    await mongoose.disconnect();
  }
}

addGamesData();
