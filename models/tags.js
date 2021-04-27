const mongoose = require('mongoose');

//schema
const TagSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  tag: {
    type: String,
    // required: true,
  },
  date: {
    type: Date,
  },
});

module.exports = mongoose.model('Tag', TagSchema);