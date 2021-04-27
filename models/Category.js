const mongoose = require('mongoose');

//schema
const CategorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  Categoryname: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('Category', CategorySchema);
