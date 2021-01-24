const mongoose = require("mongoose");

const trueString = {
  type: String,
  required: true,
};

const userSchema = new mongoose.Schema(
  {
    name: trueString,
    username: trueString,
    email: trueString,
    password: trueString,
  },
  { timestamps: true }
);

module.exports = mongoose.model("users-info", userSchema);
