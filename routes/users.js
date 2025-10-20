import express from "express";
import mongoose from "mongoose";
import Users from "../models/users.js";

const router = express.Router();

router
  .route("/:id")
  .get(async (req, res) => {
    // find a user by their object id
    try {
      const result = await Users.findById(req.params.id);
      //   console.log(result);
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      res.json({ error: e.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const deletedUser = await Users.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ error: "No user with that id exists." });
      }
      console.log("User Deleted:", deletedUser._id);
      res.status(200).json({ "User Deleted": deletedUser._id });
    } catch (e) {
      console.log(e);
      res.json({ error: e.message });
    }
  });

router.patch("/update/id/username/:id/:user", async (req, res) => {
  try {
    const id = req.params.id;
    const username = req.params.user;

    const result = await Users.updateOne(
      { _id: id },
      { $set: { username: username } }
    );
    console.log(result);
    res.json(result).status(200);
  } catch (e) {
    console.log(e);
    res.json({ error: e.message });
  }
});

router
  .route("/")
  .get(async (req, res) => {
    try {
      const result = await Users.find({});
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      res.json({ error: e.message });
    }
  })
  .post(async (req, res) => {
    // allows you to add a game to the library
    try {
      const newUser = new Users(req.body);
      // console.log(req.body);
      const result = await newUser.save();
      // console.log(result);
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      res.json({ error: e.message });
    }
  });

  export default router;
// if online, upload/retrieve all their corresponding save data
