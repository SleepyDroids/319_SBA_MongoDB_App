# SBA 319: MongoDB Database Application 💾
Created a server application and CRUD API with Node, Express, and MongoDB. This particular database aka legit_vg_cloud is meant to mimic cloud save systems similar to those that exist in Steam, Playstation, etc. I created data for users, video games and save files in order to test out different routes. 

To seed the data needed to Compass, please run: **npm run seed-all** as that will seed the data needed in the correct order.

# API Routes 🛣️

### Games 🎮

* GET /games — Return all games.
* POST /games — Create a new game.
* GET /games/:id — Get one game by ObjectId.
* PUT /games/:id — Replace a game (full-document replacement).
* DELETE /games/:id — Delete a game by ObjectId.
* PATCH /games/update/id/keyword/:id/:keyword — Add a keyword (lowercased) to a game.
* PATCH /games/update/id/platform/:id/:platform — Add a platform to a game.
* GET /games/search/title/:title — Find games by title (case-insensitive).
* GET /games/search/keyword/:keyword — Find games by keyword (case-insensitive).
* GET /games/search/platform/:platform — Find games by platform (case-insensitive).
* GET /games/search/rating/:rating — Find by ESRB and return a note about age range.
### Users 🖥️

* GET /users — Return all users.
* POST /users — Create a new user.
* GET /users/:id — Get one user by ObjectId.
* DELETE /users/:id — Delete a user by ObjectId.
* PATCH /users/update/id/username/:id/:user — Change a user’s username (must be unique because of the schema).
* PATCH /users/update/user/keyword/:user/:keyword — Add a keyword to a user’s keywords  (lowercased).
* DELETE /users/update/user/keyword/:user/:keyword — Remove a specific keyword from a user’s keywords.
* PATCH /users/update/user/platform/:user/:platform — Add a platform to a user’s profile  (lowercased).
* DELETE /users/update/user/platform/:user/:platform — Remove a specific platform from a user’s profile.
* PATCH /users/update/user/games/:user/:game — Add a game title to a user’s owned games.
* DELETE /users/update/user/games/:user/:game — Remove a specific game title from a user’s owned games.
* GET /users/status/:status — List users by status: online or offline.
* GET /users/platforms/:user — Returns the platforms a user owns/prefers.
* GET /users/keywords/:user — Returns the keywords for a user.
* GET /users/games/:user — Returns the games owned for a user.

### Saves 💾

* GET /saves — Return all saves.
* GET /saves/:id — Get one save by ObjectId.
* DELETE /saves/:id — Delete a save by ObjectId.
* GET /saves/user/id/:id — Get all saves for a specific user (by user_id).
* GET /saves/game/id/:id — Get all saves for a specific game (by game_id).
* PATCH /saves/update/id/screenshot/:id/:screenshot — Update a save file’s screenshot.

# @SleepyDroids 🤖

You can visit the repo for this project by clicking [here](https://github.com/SleepyDroids/319_SBA_MongoDB_App). For all other works, please [click here](https://github.com/SleepyDroids). ✨