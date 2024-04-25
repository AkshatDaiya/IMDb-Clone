const mongoose = require('mongoose');

const ApiData_Schema = new mongoose.Schema({
    tvid: Number,
    name: String,
    type: String,
    language: String,
    genres: [String],
    runtime: Number,
    premiered: String,
    ended: String,
    officialSite: String,
    premiered: String,
    rating: {
        average: {
            type: Number
        },
    },
    image: {
        medium: String,
        original: String
    },
    summary: String
})

module.exports = mongoose.model('Api_Data', ApiData_Schema)