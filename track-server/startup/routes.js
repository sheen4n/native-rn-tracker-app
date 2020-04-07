const express = require('express');

const auth = require('../routes/auth');
const users = require('../routes/users');
const tracks = require('../routes/tracks');
const home = require('../routes/home');

module.exports = function (app) {
  app.use(express.json());
  app.use('/api/auth', auth);
  app.use('/api/tracks', tracks);
  app.use('/api/users', users);
  app.use('/', home);
};
