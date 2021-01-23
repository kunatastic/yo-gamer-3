const notfound = (req, res, next) => {
  const error = new Error(`404 - Page Not Found`);
  res.status(404);
  next(error);
};
const errorHandling = (error, req, res, next) => {
  const err = {
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? "🥘" : error.stack,
  };
  res.json(err);
};

module.exports = { notfound, errorHandling };
