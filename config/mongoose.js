const config = require('./config');
const mongoose = require('mongoose');

module.exports = function() {
  const db = mongoose.connect(config.db);
  require('../app/users/user.server.model');
  require('../app/games/games.server.model');
  
  return db;
};
