/*
 * GET request at login
 * POST at login
 * POST at signup
 */
const experss = require("express");
const router = experss.Router();

router.get("/login", (req, res) => {
  res.json({
    msg: "Login",
  });
});

router.post("/signup", (req, res) => {
  res.json({ msg: `Waiting for response ${req.body}` });
});

module.exports = router;
