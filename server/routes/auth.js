const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.json({ message: "Sorry no access for you" });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
