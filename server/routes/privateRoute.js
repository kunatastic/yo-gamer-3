const experss = require("express");
const router = experss.Router();
const verifyToken = require("./auth");
router.get("/", verifyToken, (req, res, next) => {
  res.json({
    posts: {
      title: "My first Post",
      description: "Random data but only if you are logged inn",
    },
  });
});

module.exports = router;
