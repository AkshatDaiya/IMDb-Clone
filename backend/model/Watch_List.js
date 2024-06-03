const mongoose = require("mongoose");

const watchListSchema = new mongoose.Schema({
  firstName: String,
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
      type: Number,
    },
  },
  image: {
    medium: String,
    original: String,
  },
  summary: String,
});

module.exports = mongoose.model("Watch_List", watchListSchema);
