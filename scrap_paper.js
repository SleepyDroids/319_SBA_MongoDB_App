// A place to dump code I might need

// get a game by Id
//imports the model I made for games
import Games from "./models/games.js";

console.log(Games);
router.get("/:id", async (req, res) => {
  try {
    const result = await Games.findById(req.params.id);
    console.log(result);
    res.json(result).status(200);
  } catch (e) {
    console.log(e);
    res.json({ error: e.message });
  }
});

// static method
gamesLibrary.statics.findByTitle = function (title) {
  return this.find({ title: new RegExp(title, "i") });
};

const test = Games.findByTitle("Elden Ring")
console.log(test);

// dummy data to test post requests for /games route
const testGameData =  {
    "title": "Dragon Age: The Veilguard",
    "developer": "BioWare",
    "publisher": "Electronic Arts",
    "ESRB": "M",
    "platforms": ["Windows", "Xbox", "Playstation"],
    "keywords": [
      "role-playing",
      "fantasy",
      "romance",
      "single player",
      "character creation"
    ],
    "release_Date": "2024-10-31T00:00:00.000Z"
  }
  // trailing commas aren't allowed in json
  // and neither are functions so dates
  // need to be converted before posting

  // const testUserData =   {
  //   "username": "ThomasTheTankMain",
  //   "password": "foreverATankMain456",
  //   "isOnline:" false,
  //   "prefs": {
  //     platforms: ["Windows", "Xbox", "Android"],
  //     keywords: ["Fantasy", "Role-playing", "Horror"],
  //   }
  // }

