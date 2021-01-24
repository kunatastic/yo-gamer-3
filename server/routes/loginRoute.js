/*
 * GET request at login
 * POST at login
 * POST at signup
 */

// Importing prebuild modules
const experss = require("express");
const router = experss.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Importing user defiened modules
const userModel = require("../models/userDetails");
const userSchemaValidator = require("../models/validations/userDetails");
const userLoginSchemaValidator = require("../models/validations/loginDetails");

router.get("/login", async (req, res, next) => {
  try {
    const allUsers = await userModel.find();
    res.json(allUsers);
  } catch (error) {
    console.log(error.name);
    next(error);
  }
});

/*
 * Template for Input request
 * {
 *  "name": "testtwo",
 *  "username": "test2",
 *  "email": "test2@email.com",
 *  "password": "test2",
 *  "confirmPassword": "test2"
 * }
 */

router.post("/newuser", async (req, res, next) => {
  try {
    const { error } = userSchemaValidator.validate(req.body);
    // Handling the basic validation
    if (error) {
      return next(error);
    }
    // Handling the not unique Username
    const queryUsername = {
      username: req.body.username,
    };
    const sameUsername = await userModel.findOne(queryUsername);
    if (sameUsername) {
      return next({
        message: `This username - '${req.body.username}' already exists`,
        stack: `This username - '${req.body.username}' already exists`,
      });
    }
    // Handling the not unique email
    const queryEmail = {
      email: req.body.email,
    };
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

/* Template for userLogin
  {
    email: "---",
    password: "-----",
  }
*/

router.post("/login", async (req, res, next) => {
  try {
    const { error } = userLoginSchemaValidator.validate(req.body);
    if (error) {
      return next(error);
    }
    // Checking if Email exists
    const queryEmail = {
      email: req.body.email,
    };
    const user = await userModel.findOne(queryEmail);
    if (!user) {
      return next({
        message: `Email or Password Incorrect`,
        stack: `Email is Incorrect`,
      });
    }
    // Check with the Password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return next({
        message: `Email or Password Incorrect`,
        stack: `Password is Incorrect`,
      });
    }
    // Create a JWT
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.header("auth-token", token);
    res.json({
      msg: `Hey there! Mr ${user.name}`,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
