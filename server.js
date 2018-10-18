process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const configureMongoose = require('./config/mongoose');
const configureExpress = require('./config/express');
const configurePassport = require('./config/passport');

const db = configureMongoose();
const app = configureExpress();
const passport = configurePassport();

app.listen(4900);
module.exports = app;

console.log('Chessty Dict API - DEV Server running at http://localhost:4900/');