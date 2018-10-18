const mongoose = require('mongoose');
const Game = mongoose.model('Game');
const Chess = require('../../node_modules/chess.js/chess.js').Chess;

exports.create = function(req, res) {
  const game = new Game(req.body);
  const chess = new Chess();
  // game.creator = req.user;
  game.fen = chess.fen();
  game.board = chess.board();
  game.turn = chess.turn();
  console.log('new game');
  game.save((err) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.status(200).json(game);
    }
  });
};

exports.list = function(req, res) {
  //Game.find().sort({'dateAdded': 1}).populate('creator', 'firstName lastName fullName').exec((err, games) => {
  Game.find().sort({'dateAdded': 1}).exec((err, games) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.status(200).json(games);
    }
  });
};

exports.read = function(req, res) {
  res.status(200).json(req.game);
};

exports.move = function(req, res) { // add a move
  const game = req.game;
  const move = req.body;
  
  const chess = new Chess();
  chess.load(game.fen);
  const moveResult = chess.move(move);
  game.board = chess.board();
  game.fen = chess.fen();
  game.history.push(moveResult);
  game.turn = chess.turn();
  game.gameOver = chess.game_over();
  game.inCheck = chess.in_check();
  game.inCheckMate = chess.in_checkmate();
  game.inDraw = chess.in_draw();
  game.inStaleMate = chess.in_stalemate();
  game.inThreeFoldRep = chess.in_threefold_repetition();
  game.insufficient = chess.insufficient_material();
    
  game.save((err) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.status(200).json(game);
    }
  });
};


exports.delete = function(req, res) {
  const game = req.game;

  game.remove((err) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.status(200).json(game);
    }
  });
};

exports.hasAuthorization = function(req, res, next) {
  if (req.game.creator.id !== req.user.id) {
    return res.status(403).send({
      message: 'User is not authorized'
    });
  }
  next();
};


exports.gameByID = function(req, res, next, id) {
//  Game.findById(id).populate('creator', 'firstName lastName fullName').exec((err, game) => {
  Game.findById(id).exec((err, game) => {
    if (err) return next(err);
    if (!game) return next(new Error('Failed to load game ' + id));

    req.game = game;
    next();
  });
};

function getErrorMessage (err) {
  if (err.errors) {
    for (let errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return 'Unknown server error';
  }
};
