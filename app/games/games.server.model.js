const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  dateStarted: {
    type: Date,
    default: Date.now
  },
  fen: {
    type: String,
    default: '',
    trim: true,
    required: 'FEN cannot be blank'
  },
  history: [],
  board: [[]],
  turn: {type: String, default: 'w'},
  gameOver: {type: Boolean, default: false},
  inCheck: {type: Boolean, default: false},
  inCheckMate: {type: Boolean, default: false},
  inDraw: {type: Boolean, default: false},
  inStaleMate: {type: Boolean, default: false},
  inThreeFoldRep: {type: Boolean, default: false},
  insufficient: {type: Boolean, default: false},
});

GameSchema.set('toJSON', {
  virtuals: false
});

mongoose.model('Game', GameSchema);
