/*
 * GET request at login
 * POST at login
 * POST at signup
 */
// Importing prebuild modules
// const Joi = require("joi");
const experss = require("express");
const router = experss.Router();
const bcrypt = require("bcryptjs");

// Importing user defiened modules
const userModel = require("../models/userDetails");
const userSchemaValidator = require("../models/validations/userDetails");

router.get("/login", async (req, res, next) => {
  try {
    const allUsers = await userModel.find();
    res.json(allUsers);
  } catch (error) {
    console.log(error.name);
    next(error);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const { error } = userSchemaValidator.validate(req.body);

    // Handling the basic validation
    if (error) {
      return next(error);
    }

    // Handling the not unique email and Username
    const queryUsername = {
      username: req.body.username,
    };
    const queryEmail = {
      email: req.body.email,
    };
    const sameUsername = await userModel.findOne(queryUsername);
    if (sameUsername) {
      return next({
        message: `This username - '${req.body.username}' already exists`,
        stack: `This username - '${req.body.username}' already exists`,
      });
    }
    const sameEmail = await userModel.findOne(queryEmail);
    if (sameEmail) {
      return next({
        message: `This email - '${req.body.email}' already exists`,
        stack: `This email - '${req.body.email}' already exists`,
      });
    }

    // Encrypting the password

    const hash = bcrypt.hashSync(req.body.password, process.env.SALT_ROUNDS);

    const userData = {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hash,
    };
    const user = new userModel(userData);
    const newUser = await user.save();
    res.json(newUser._id);
  } catch (error) {
    next(error);
  }
});

router.post("/login", (req, res) => {
  console.log(req.body);
  res.json({ msg: `Waiting for response ${JSON.stringify(req.body)}` });
});

module.exports = router;
