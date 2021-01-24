const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 255,
    },
    email: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 255,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 1024,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users-info", userSchema);
