const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema
const JobSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        companyId: {
            type: Schema.Types.ObjectId,
            ref: 'Company'
        },
        companyName: {
            type: String,
        },
        type:{
            type: String,
        },
        role: {
            type: String
        },
        tags: {
            type: [String]
        },
        applyLink: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true },

);

module.exports = mongoose.model('Job', JobSchema);