import mongoose from "mongoose";
import "dotenv/config";

// importing models I'll need
// in order to pull the data I'll need to attempt the aggregation
import Users from "../models/users.js";
import Games from "../models/games.js";
import Saves from "../models/saves.js";

import savesData from "../data/saves.js";

const connectionString = process.env.ATLAS_URI || "";

async function addSavesData() {
  await mongoose.connect(connectionString);
  console.log("Connected to mongodb!");

  console.log("Seeding saves data...");
  try {
    // going to use the previous seeded data to construct
    // the saves data and linking it to the other data
    // without the aggregation
    const allUsers = await Users.find({});
    const allGames = await Games.find({});

    const usernameToUserId = {};
    // for of loop for objects
    // iterate over each document object in my users collection
    for (const userDoc of allUsers) {
      // match username to user id (both are unique)
      usernameToUserId[userDoc.username] = userDoc._id;
    }

    const gameTitleToGameId = {};
    // same concept from users
    for (const gameDoc of allGames) {
      gameTitleToGameId[gameDoc.title] = gameDoc._id;
    }

    // map to transform/create a save file to match my schema/pre-made data
    // added usernames and game titles to save data
    // in order to be able to link them across collections
    const newSaves = savesData.map((saveFile) => {
      const userId = usernameToUserId[saveFile.username];
      const gameId = gameTitleToGameId[saveFile.gameTitle];

      // shaping out the save file
      const autosave = {
        username: saveFile.username,
        title: saveFile.name,
        screenshot: saveFile.screenshot,
        gameTitle: saveFile.gameTitle,
        user_id: userId,
        game_id: gameId,
      };

      return autosave; // map is a function so can use return
    });
    // should work after the saves are constructed
    // hopefully
    const delSaves = await Saves.deleteMany({});
    console.log(`Deleted: ${delSaves.deletedCount}`);

    const addSaves = await Saves.insertMany(newSaves);
    console.log(`Uploaded: ${addSaves.length}`);
    console.log("Construction and seeding of saves data completed.");
  } catch (e) {
    console.log(e);
  } finally {
    await mongoose.disconnect();
  }
}

addSavesData();
