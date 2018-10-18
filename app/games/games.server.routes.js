const users = require('../../app/users/user.server.controller');
const games = require('../../app/games/games.server.controller');

module.exports = function(app) {
  app.route('/api/games')
    .get(games.list)  // list all stored games;
    .post(games.create);  // start a new game;

  app.route('/api/games/:gameId')
    .get(games.read) // return current game object
    .put(games.move) // add a move
    .delete(games.delete); // delete game
  
  app.param('gameId', games.gameByID);
};


/*  Shed

//    .post(users.requiresLogin, games.create);

//    .put(users.requiresLogin, scotches.hasAuthorization, games.update)
//    .delete(users.requiresLogin, scotches.hasAuthorization, games.delete);


*/