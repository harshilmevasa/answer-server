const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
let User = require('../../models/User');
const router = express.Router();

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'please enter password with 3 or more').isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      const hashpass = await bcrypt.hash(req.body.password, 12);
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashpass,
      });

    const {email} = req.body;

    const emailCheck = await  User.findOne({email:email})

      if(emailCheck)
      {
        req.status(400).json({message:"email already used"});
      }else{
        const user = await newUser.save();
        res.json(user);
      }

    } catch (err) {
      res.status(500).json({message:err.message});
    }
  }
);

router.get('/',
  async (req, res) => {
    try {
      const users = await User.find();
      res.send(users);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });

module.exports = router;
