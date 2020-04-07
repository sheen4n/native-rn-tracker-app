const jwt = require('jsonwebtoken');
const config = require('config');

const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  // authorization === "Bearer = laks"

  if (!authorization) return res.status(401).send({ error: 'You must be logged in.' });

  const authorization_array = authorization.split(' ');

  if (authorization_array[0] != 'Bearer') return res.status(401).send({ error: 'Invalid Token.' });

  const token = authorization_array[1];

  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    const { userId } = decoded;
    const user = await User.findById(userId);

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({ error: 'Invalid Token' });
  }
};
