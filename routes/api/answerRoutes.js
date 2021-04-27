const express = require('express');
const uuid = require('uuid');
const { check, validationResult } = require('express-validator');
let Answer = require('../../models/Answer');
const auth = require('../../middleware/auth');

const router = express.Router();

router.get('/:id',
  async (req, res) => {
    try {
      const answer = await Answer.findById(req.params.id);
      if (!answer) {
        return res.status(404).send('answer not found');
      }
      res.send(answer);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });


router.get('/getAnswersByQuestionID/:id',
  async (req, res) => {
    let condition = {
      questionID: req.params.id
    };
    try {
      const answers = await Answer.find(condition).sort({ createdAt: -1 });
      res.send(answers);
    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);

router.post(
  '/',
  auth,

  [
    check('questionID', 'QuestionID  is required').not().isEmpty(),
    check('userID', 'userID is required').not().isEmpty(),
    check('answer', 'answer is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const newAnswer = new Answer({
        questionID: req.body.questionID,
        userID: req.body.userID,
        answer: req.body.answer,
        likes: req.body.likes
      });

      const result = await newAnswer.save();

      res.send(result);
    } catch (err) {
      res.status(500).send({ msg: err });
    }
  }
);

router.post(
  '/:id/addLike',
  auth,

  async (req, res) => {
    try {
      const answer = await Answer.findById(req.params.id);
      if (!answer) {
        return res.status(404).json({ msg: 'Answer not found' });
      }
      answer.likes = answer.likes + 1;
      await answer.save();
      res.send(answer);
    } catch (err) {
      res.status(500).send({ "msg": err });
    }
  });


module.exports = router;