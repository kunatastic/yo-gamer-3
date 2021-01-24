const mongoose = require("mongoose");

const trueString = {
  type: String,
  required: true,
};

const userSchema = new mongoose.Schema(
  {
    name: trueString,
    username: { unique: true },
    email: trueString,
    password: trueString,
    confirmPassword: trueString,
  },
  { timestamps: true }
);

module.exports = mongoose.model("users-info", userSchema);
