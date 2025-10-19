// To seed users data, please use: node scripts/seed_users.js in the terminal
import mongoose from "mongoose";
import "dotenv/config";

// importing users model
import Users from "../models/users.js";
// importing starter data for users
import usersData from "../data/users.js";

// connecting to mongodb w/ mongoose
const connectionString = process.env.ATLAS_URI || "";

async function addUsersData() {
  await mongoose.connect(connectionString);
  console.log("Connected to mongodb!");

  console.log("Seeding users data...");
  try {
    // clean out the collection first for resetting data
    const delUsers = await Users.deleteMany({});
    console.log(`Deleted: ${delUsers.deletedCount}`);
    // add the default game data
    const addUsers = await Users.insertMany(usersData);
    console.log(`Uploaded: ${addUsers.length}`);
    console.log("Seeding of users data complete.");
  } catch (e) {
    console.log(e.message);
  } finally {
    await mongoose.disconnect();
  }
}

addUsersData();
