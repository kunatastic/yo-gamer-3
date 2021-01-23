// Importing prebuilt modules
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();

// Importing custom modules
const { notfound, errorHandling } = require("./errors/middleware");
const loginRouters = require("./routes/loginRoute");

// Configuration env
require("dotenv").config();

// Middlewares
app.use(morgan("common"));
app.use(helmet());
app.use(express.json());

// Routes
app.use("/", loginRouters);
app.use(notfound);
app.use(errorHandling);

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
