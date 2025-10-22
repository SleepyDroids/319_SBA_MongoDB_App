import express from "express";
import mongoose from "mongoose";
import Saves from "../models/saves.js";

const router = express.Router();

// returns saves for a user based on their object id
router.get("/user/id/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Saves.find({ user_id: id });
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.json({ error: e.message });
  }
});

// returns all the saves for a particular game based on its object id
router.get("/game/id/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Saves.find({ game_id: id });
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.json({ error: e.message });
  }
});

router
  .route("/:id")
  .get(async (req, res) => {
    // find a save by its object id
    try {
      const result = await Saves.findById(req.params.id);
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      res.json({ error: e.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const deletedSave = await Saves.findByIdAndDelete(req.params.id);
      if (!deletedSave) {
        return res.status(404).json({ error: "No save with that id exists." });
      }
      console.log("Save File Deleted:", deletedSave._id);
      res.status(200).json({ "Save File Deleted": deletedSave._id });
    } catch (e) {
      console.log(e);
      res.json({ error: e.message });
    }
  });

// update a save file's screenshot
// like when you overwrite a save in a game, it updates where you are in the game
router.patch("/update/id/screenshot/:id/:screenshot", async (req, res) => {
  try {
    const id = req.params.id;
    const screenshot = req.params.screenshot;

    const result = await Saves.updateOne({ _id: id }, { $set: screenshot });
    console.log(result);
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.json({ error: e.message });
  }
});

router.route("/").get(async (req, res) => {
  // returns all save data
  try {
    const result = await Saves.find({});
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.json({ error: e.message });
  }
});

export default router;
