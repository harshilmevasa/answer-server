const express = require('express');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

let Account = require('../../models/Account');

const router = express.Router();

router.get('/', 
auth,
async (req, res) => {
  try {
    const accounts = await Account.find();
    res.send(accounts);
  } catch (err) {
    res.status(400).send('Server Error');
  }
});

router.get('/:id',
auth,
 async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) {
      return res.status(404).send('Account Details not found');
    }
    res.send(account);
  } catch (err) {
    res.status(400).send('Server Error');
  }
});

router.post(
  '/',
  auth ,
  [
    check('name', 'User name is required').not().isEmpty(),
    check('questionAsked', 'Question must be of min 6 alphabets').isLength({
      min: 6,
    }),
    check('answerGiven', 'Answer must be of min 6 alphabets').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(402).json({ errors: errors.array() });
      }
      const newAccount = new Account({
        user : req.user.id,
        name: req.body.name,
        questionAsked: req.body.questionAsked,
        answerGiven: req.body.answerGiven,
        likes: req.body.likes,
      });

      const result = await newAccount.save();

      res.send(result);
    } catch (err) {
      res.status(400).send('Server Error');
    }
  }
);

router.delete('/',
auth,
 async (req, res) => {
  try {
    const account = await Account.findById(req.body.id);
    if (!account) {
      return res.status(404).json({ msg: 'Account Details not found' });
    }
    const result = await Account.findByIdAndDelete(req.body.id);
    res.send(result);
  } catch (err) {
    res.status(400).send('Server Error');
  }
});

router.put('/',auth,
 async (req, res) => {
  try {
    const account = await Account.findById(req.body.id);
    if (!account) {
      return res.status(404).json({ msg: 'Account Details not found' });
    }

    account.name = req.body.name;
    account.questionAsked = req.body.questionAsked;
    account.answerGiven = req.body.answerGiven;
    account.likes = req.body.likes;

    await account.save();
    res.send(account);
  } catch (err) {
    res.status(400).send('Server Error');
  }
});

module.exports = router;