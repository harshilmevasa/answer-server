const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema
const AnswerSchema = new mongoose.Schema(
    {
        questionID: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Question'
        },
        userID: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        answer: {
            type: String,
            required: true,
        },
        likes: {
            type: Number
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Answer', AnswerSchema);