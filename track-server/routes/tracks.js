const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();

const { Track } = require('../models/Track');

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const tracks = await Track.find({ userId: req.user._id });
    res.send(tracks);
  } catch (error) {
    return res.status(404).send('Invalid Request');
  }
});

router.post('/', async (req, res) => {
  const { name, locations } = req.body;

  if (!name || !locations) return res.status(422).send({ error: 'You must provide a name and locations' });
  try {
    const track = new Track({ name, locations, userId: req.user._id });
    await track.save();
    res.send(track);
  } catch (error) {
    return res.status(422).send({ error: error.message });
  }
});

module.exports = router;
