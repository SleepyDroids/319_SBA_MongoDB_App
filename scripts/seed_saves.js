import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

// importing models I'll need
// in order to pull the data I'll need to attempt the aggregation
import Users from "../models/users.js";

const connectionString = process.env.ATLAS_URI || "";

async function createSaves() {
  await mongoose.connect(connectionString);
  console.log("Connected to mongodb!");
  try {
    const autosave = await Users.aggregate([
  {
    $lookup:
      {
        from: "games",
        localField: "prefs.gamesOwned",
        foreignField: "title",
        as: "saves_cloud"
      }
  },
  {
    $unwind:
      {
        path: "$saves_cloud",
        preserveNullAndEmptyArrays: false
      }
  },
  {
    $project:
      {
        user: mongoose.Types.ObjectId.createFromHexString("$_id"),
        game: mongoose.Types.ObjectId.createFromHexString("$saves_cloud._id"),
        _id: 0,
        title: "$saves_cloud.title"
      }
  },
  {
    $addFields:
      {
        save_name: "auto save",
        screenshot: "screenshot.jpg"
      }
  },
  {
    $out:

      {
        db: "legit_vg_cloud",
        coll: "saves"
      }
  }
]);
console.log(autosave)
    return autosave;
  } catch (e) {
    console.log(e);
  }
  // } finally {
  //   await mongoose.disconnect();
  // }
}

createSaves();
