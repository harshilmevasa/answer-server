const express = require('express');
const uuid = require('uuid');
const { check, validationResult } = require('express-validator');
let Question = require('../../models/Question');
const auth = require('../../middleware/auth');

const router = express.Router();

router.get('/',
  async (req, res) => {
    try {
      const questions = await Question.find().sort({ createdAt: -1 });
      res.send(questions);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });

router.get('/:id',
  async (req, res) => {
    try {
      const question = await Question.findById(req.params.id);
      if (!question) {
        return res.status(404).send('question not found');
      }
      res.send(question);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });


router.get('/user/:id',
  auth,
  async (req, res) => {
    try {
      let condition = {
        user: req.params.id
      };
      const question = await Question.find(condition).sort({ createdAt: -1 });
      if (!question) {
        return res.status(404).send('question not found');
      }
      res.send(question);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });

router.post(
  '/',
  auth,
  [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('user', 'user is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const newQuestion = new Question({
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags,
        category: req.body.category,
        views: req.body.views,
        likes: req.body.likes,
        comments: req.body.comments,
        user: req.body.user,
      });

      const result = await newQuestion.save();

      res.send(result);
    } catch (err) {
      res.status(500).send({ msg: err });
    }
  }
);

router.delete('/:id',
  auth,
  async (req, res) => {
    try {
      const question = await Question.findById(req.params.id);
      if (!question) {
        return res.status(404).json({ msg: 'Question not found' });
      }
      const result = await Question.findByIdAndDelete(req.params.id);
      res.send(result);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });

router.put('/',
  auth,
  [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('user', 'user is required').not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const question = await Question.findById(req.body.id);
      if (!question) {
        return res.status(404).json({ msg: 'Question not found' });
      }

      question.title = req.body.title;
      question.description = req.body.description;
      question.tags = req.body.tags;
      question.category = req.body.category;
      question.views = req.body.views;
      question.likes = req.body.likes;
      question.comments = req.body.comments;
      question.user = req.body.user;

      await question.save();
      res.send(question);
    } catch (err) {
      res.status(500).send({ "msg": err });
    }
  });

router.post(
  '/:id/addLike',
  auth,
  async (req, res) => {
    try {
      const question = await Question.findById(req.params.id);
      if (!question) {
        return res.status(404).json({ msg: 'Question not found' });
      }
      question.likes = question.likes + 1;
      await question.save();
      res.send(question);
    } catch (err) {
      res.status(500).send({ "msg": err });
    }
  });

router.post(
  '/:id/addView',
  auth,
  async (req, res) => {
    try {
      const question = await Question.findById(req.params.id);
      if (!question) {
        return res.status(404).json({ msg: 'Question not found' });
      }
      question.views = question.views + 1;
      await question.save();
      res.send(question);
    } catch (err) {
      res.status(500).send({ "msg": err });
    }
  });

router.post(
  '/:id/addComment',
  auth,
  [
    check('comment', 'comment is required').not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const question = await Question.findById(req.params.id);
      if (!question) {
        return res.status(404).json({ msg: 'Question not found' });
      }
      question.comments.push(req.body.comment);
      await question.save();
      res.send(question);
    } catch (err) {
      res.status(500).send({ "msg": err });
    }
  });

module.exports = router;