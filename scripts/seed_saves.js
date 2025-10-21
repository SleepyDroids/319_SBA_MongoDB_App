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
        $lookup: {
          from: "games",
          localField: "prefs.gamesOwned",
          foreignField: "title",
          as: "saves_cloud",
        },
      },
      {
        $unwind: {
          path: "$saves_cloud",
        },
      },
      {
        $project: {
          username: 1,
          "saves_cloud._id": 1,
          "saves_cloud.title": 1,
        },
      },
      {
        $addFields: {
          save_name: "auto save",
          screenshot: "screenshot.jpg",
        },
      },
      {
        $merge: {
          into: "saves",
          on: "_id",
          whenMatched: "replace",
          whenNotMatched: "insert",
        },
      },
    ]);

    return autosave;
  } catch (e) {
    console.log(e);
  } finally {
    await mongoose.disconnect();
  }
}

createSaves();
