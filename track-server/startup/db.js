const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

const db = config.get('db');

module.exports = function () {
  mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on('connected', () => {
    winston.info('Connected to mongo instance');
  });

  mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongodb', err);
  });
};
