const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
let Tag = require('../../models/tags');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.find();
    res.send(tags);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
      return res.status(404).send('task not found');
    }
    res.send(tag);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post(
  '/',auth,
  [
    check('tag', 'Tag is required').not().isEmpty()
   
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const newTag = new Tag({
        tag: req.body.tag,
        date: req.body.date,
      });
    

      const result = await newTag.save();

      res.send(result);
    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);



router.delete('/', auth, async (req, res) => {
  try {
    const tag = await Tag.findById(req.body.id);
    if (!tag) {
      return res.status(404).json({ msg: 'id not found' });
    }
    const result = await Tag.findByIdAndDelete(req.body.id);
    res.send(result);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.put('/', auth,async (req, res) => {
  try {
    const tag = await Tag.findById(req.body.id);
    if (!tag) {
      return res.status(404).json({ msg: 'Id not found' });
    }

    tag.tag = req.body.tag;
    tag.date = req.body.date;
    await tag.save();
    res.send(tag);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
