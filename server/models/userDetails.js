const mongoose = require("mongoose");
const joi = require("joi");
const trueString = {
  type: String,
  required: true,
};

const userSchema = new mongoose.Schema(
  {
    name: trueString,
    password: { trueString, minlength: 4 },
    username: { trueString, unique: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

const userModel = mongoose.Model("user-info", userSchema);
module.exports = { userModel, schemaValidator };
