// const mongoose = require("mongoose");
// const joigoose = require("joigoose")(mongoose);
// const joi = require("joi");

// const joiUserSchema = joi.object({
//   username: joi.string().alphanum().required(),
//   password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{4,}$")).required(),
//   confirmPassword: joi.ref("password"),
//   email: joi.string().email().required(),
//   name: joi.string().required(),
// });

// const trueString = {
//   type: String,
//   required: true,
// };

// const userSchema = new mongoose.Schema(
//   joigoose.convert(joiUserSchema, { typeKey: "$type" }),
//   { timestamps: true }
// );

// const userModel = mongoose.Model("user-info", userSchema);
// module.exports = { userModel };

const Mongoose = require("mongoose");
const Joi = require("Joi");
const Joigoose = require("joigoose")(Mongoose);

var joiUserSchema = Joi.object({
  name: Joi.object({
    first: Joi.string().required(),
    last: Joi.string().required(),
  }),
  email: Joi.string().email().required(),
  bestFriend: Joi.string().meta({
    _mongoose: { type: "ObjectId", ref: "User" },
  }),
  metaInfo: Joi.any(),
  addresses: Joi.array()
    .items({
      line1: Joi.string().required(),
      line2: Joi.string(),
    })
    .meta({ _mongoose: { _id: false, timestamps: true } }),
});

var mongooseUserSchema = new Mongoose.Schema(
  Joigoose.convert(joiUserSchema, {
    typeKey: "$type",
  })
);
User = Mongoose.model("User", mongooseUserSchema);
