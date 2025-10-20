import express from "express";
import mongoose from "mongoose";
import Users from "../models/users.js";

const router = express.Router();

router.patch("/update/id/username/:id/:user", async (req, res) => {
  // change username, must be unique according to schema
  try {
    const id = req.params.id;
    const username = req.params.user;
    const result = await Users.updateOne({ _id: id }, { $set: { username } });
    console.log(result);
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.json({ error: e.message });
  }
});

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
    // excommunicado a user
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

// get all online or offline users
router.get("/status/:status", async (req, res) => {
  try {
    const status = req.params.status.toLowerCase();
    if (status === "online") {
      const result = await Users.find({ isOnline: true });
      res.status(200).json(result);
    } else if (status === "offline") {
      const result = await Users.find({ isOnline: false });
      res.status(200).json(result);
    } else {
      console.log("User status is currently unavailable.");
      res.status(404).json({ error: "User status is currently unavailable." });
    }
  } catch (e) {
    console.log(e);
    res.json({ error: e.message });
  }
});

// add a keyword to a user's preferences by username
router
  .route("/update/user/keyword/:user/:keyword")
  .patch(async (req, res) => {
    try {
      const username = req.params.user;
      const keyword = req.params.keyword.toLowerCase();
      const result = await Users.updateOne(
        { username },
        { $push: { "prefs.keywords": keyword } }
      );
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      res.json({ error: e.message });
    }
  })
  .delete(async (req, res) => {
    // remove a specific entry from a user's keywords
    try {
      const username = req.params.user;
      const keyword = req.params.keyword.toLowerCase();
      const result = await Users.updateOne(
        { username },
        { $pull: { "prefs.keywords": keyword } }
      );
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      res.json({ error: e.message });
    }
  });

// add a platform to a user's preferences by username
router
  .route("/update/user/platform/:user/:platform")
  .patch(async (req, res) => {
    try {
      const username = req.params.user;
      const platform = req.params.platform.toLowerCase();
      const result = await Users.updateOne(
        { username },
        { $push: { "prefs.platforms": platform } }
      );
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      res.json({ error: e.message });
    }
  })
  .delete(async (req, res) => {
    // remove a specific platform from a user's preferences
    try {
      const username = req.params.user;
      const platform = req.params.platform.toLowerCase();
      const result = await Users.updateOne(
        { username },
        { $pull: { "prefs.platforms": platform } }
      );
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      res.json({ error: e.message });
    }
  });

// use username to get a user's preferred platforms
router.get("/platforms/:user", async (req, res) => {
  try {
    const username = req.params.user;
    const result = await Users.findOne({ username });
    const platforms = result.prefs.platforms;
    // console.log(platforms);
    res.status(200).json(platforms);
  } catch (e) {
    console.log(e);
    res.json({ error: e.message });
  }
});

// use username to get a user's preferred keywords
router.get("/keywords/:user", async (req, res) => {
  try {
    const username = req.params.user;
    const result = await Users.findOne({ username });
    const keywords = result.prefs.keywords;
    // console.log(keywords);
    res.status(200).json(keywords);
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
    // create a new user, should throw error if username is not unique
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
// an aggregation to solve later
