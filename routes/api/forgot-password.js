const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();
let User = require('../../models/User');


router.post(
  '/',
  [
    check('email', 'email is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email} = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Email does not exsist' }] });
      }else{     
       return res
       .status(200)
       .json({ errors: [{ msg: "Account present" }] });

      }


    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

module.exports = router;