import express from "express";
import mongoose from "mongoose";
import Games from "../models/games.js";

const router = express.Router();

// id route
router
  .route("/:id")
  .get(async (req, res) => {
    // find a game by its object id
    try {
      const result = await Games.findById(req.params.id);
      //   console.log(result);
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      res.json({ error: e.message });
    }
  })
  .put(async (req, res) => {
    try {
      // old code
      // const replace = await Games.deleteOne(req.params.id);
      // console.log("Document Deleted:", replace._id);
      // const replaceWith = new Games(req.body);
      // const result = await replaceWith.save();
      // console.log("Document Added:", result._id);

      // replace an entire game doc
      const originalDoc = req.params.id;
      const newDoc = req.body;
      const replacement = await Games.replaceOne({ _id: originalDoc }, newDoc);
      console.log(replacement);

      // checking to see if the document was properly updated
      const updatedDoc = await Games.findById(originalDoc);
      console.log("Updated Doc:", updatedDoc);

      res.status(200).json(replacement);
      // at this point the doc should be updated
    } catch (e) {
      console.log(e);
      res.json({ error: e.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const deletedGame = await Games.findByIdAndDelete(req.params.id);
      if (!deletedGame) {
        return res
          .status(404)
          .json({ error: "No game with that id exists." });
      }
      console.log("Game Doc Deleted:", deletedGame._id);
      res.status(200).json({ "Game Doc Deleted": deletedGame._id });
    } catch (e) {
      console.log(e);
      res.json({ error: e.message });
    }
  });

router.patch("/update/id/keyword/:id/:keyword", async (req, res) => {
  try {
    const id = req.params.id;
    const keyword = req.params.keyword.toLowerCase();
    const result = await Games.updateOne(
      { _id: id },
      { $push: { keywords: keyword } }
    );
    console.log(result);
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.json({ error: e.message });
  }
});

router.patch("/update/id/platform/:id/:platform", async (req, res) => {
  try {
    const id = req.params.id;
    const platform = req.params.platform;
    // first arg is query, second is what changes for .updateOne
    const result = await Games.updateOne(
      { _id: id },
      { $push: { platforms: platform } }
    );
    console.log(result);
    res.json(result).status(200);
  } catch (e) {
    console.log(e);
    res.json({ error: e.message });
  }
});

router.get("/search/keyword/:keyword", async (req, res) => {
  try {
    const keyword = req.params.keyword;
    // using regex to account create case INsensitivity
    const result = await Games.find({
      keywords: { $regex: new RegExp(keyword, "i") },
    });
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.json({ error: e.message });
  }
});

router.get("/search/platform/:platform", async (req, res) => {
  try {
    const platform = req.params.platform;
    const result = await Games.find({
      platforms: { $regex: new RegExp(platform, "i") },
    });
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.json({ error: e.message });
  }
});

router.get("/search/title/:title", async (req, res) => {
  try {
    const title = req.params.title;
    const result = await Games.find({
      title: { $regex: new RegExp(title, "i") },
    });
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.json({ error: e.message });
  }
});

router.get("/search/rating/:rating", async (req, res) => {
  try {
    const rating = req.params.rating;
    const result = await Games.find({
      ESRB: { $regex: new RegExp(rating, "i") },
    });
    // .find returns an array
    // since I know there's only one rating can use [0] index
    if (result[0].ESRB == "M") {
      res
        .status(200)
        .json({ Note: "Player must be 17+ to play this game.", result });
    } else if (result[0].ESRB == "T") {
      res
        .status(200)
        .json({ Note: "Player must be 13+ to play this game.", result });
    } else if (result[0].ESRB == "E") {
      res
        .status(200)
        .json({ Note: "This game is rated E for everyone.", result });
    } else {
      res.status(404).json({
        error: "This rating does not currently exist in the database.",
      });
    }
  } catch (e) {
    console.log(e);
    res.json({ error: e.message });
  }
});

// all games data (/games) && post a new game
router
  .route("/")
  .get(async (req, res) => {
    // returns all game data
    try {
      const result = await Games.find({});
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      res.json({ error: e.message });
    }
  })
  .post(async (req, res) => {
    // allows you to add a game to the library
    try {
      const newGame = new Games(req.body);
      // console.log(req.body);
      const result = await newGame.save();
      // console.log(result);
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      res.json({ error: e.message });
    }
  });

router.get("/platforms/id/:id", async (req, res) => {
  try {
    const aggregation = await Games.aggregate([
      {
        $match:
          {
            _id: req.params.id,
          },
      },
      {
        $project:
          {
            title: 1,
            platforms: 1,
          },
      },
    ]);
    res.status(200).json(aggregation);
  } catch (e) {
    console.log(e);
    res.json({ error: e.message });
  }
});

// add aggregation to group a title of a game to its available platforms
// or try to create a static function who knows man

export default router;
