const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
    required: true,
  },
  questionAsked: {
    type: String,
  },
  answerGiven: {
    type: String,
  },
  likes: {
    type: Number,
  },
});

module.exports = mongoose.model('Account', AccountSchema);