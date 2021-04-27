const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema
const CompanySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        website: {
            type: String,
        },
        industry: {
            type: String,
        },
        status: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Company', CompanySchema);