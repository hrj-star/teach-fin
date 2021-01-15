const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/user");
const UserSchemas = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  dailycheckin: {
    type: Number,
    required: true,
  },
});

module.exports = new mongoose.model("Users", UserSchemas);