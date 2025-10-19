import express from "express";
import "dotenv/config";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

// for env, name of database is: legit_vg_cloud
const port = process.env.PORT || 8080;
const connectionString = process.env.ATLAS_URI || "";

// mongodb code block *****
try {
  await mongoose.connect(connectionString);
  console.log("Connected to mongodb!");
} catch (e) {
  console.log(e);
}
// end of mongdb code block *****

// routes
import gamesRouter from "./routes/games.js";

app.use("/games", gamesRouter);

app.get("/", (req, res) => {
  res.send("This is the main directory. WIP.");
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
