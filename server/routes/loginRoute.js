/*
 * GET request at login
 * POST at login
 * POST at signup
 */
const experss = require("express");
const router = experss.Router();

const userModel = require("../models/userDetails");

router.get("/login", async (req, res, next) => {
  try {
    const allUsers = await userModel.find();
    res.json(allUsers);
  } catch (error) {
    console.log(error.name);
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    console.log(req.body);
  } catch (error) {
    console.log(error.name);
    next(error);
  }
});

router.post("/signup", (req, res) => {
  console.log(req.body);
  res.json({ msg: `Waiting for response ${JSON.stringify(req.body)}` });
});

module.exports = router;
