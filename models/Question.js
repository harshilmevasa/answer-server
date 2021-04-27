const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema
const QuestionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        tags: {
            type: [String]
        },
        category: {
            type: [String]
        },
        date: {
            type: Date,
            default: Date.now,
        },
        views: {
            type: Number
        },
        likes: {
            type: Number
        },
        comments: {
            type: [String],
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true },

);

module.exports = mongoose.model('Question', QuestionSchema);