const mongoose = require("mongoose");

const regSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  pass: String,
  role: { type: String, default: "Public" },
  img: { type: String },
  createDeta: { type: Date, default: new Date() },
  status: { type: String, default: "Suspended" },
});

module.exports = mongoose.model("reg", regSchema);
