const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/', auth, (req, res) => {
  // res.send("Hello");
  res.send(`Your email is ${req.user.email}`);
});

// router.get("/", (req, res) => {
//   return res.status(400).send("Hello");
//   //   res.send(`Your email is ${req.user.email}`);
// });

module.exports = router;
