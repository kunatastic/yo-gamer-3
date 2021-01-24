// Importing prebuilt modules
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require("cors");

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
app.use(cors());

// MongoDB

mongoose.connect(
  process.env.MONGO_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (err) console.error(err);
    console.log("DB Connnected!!");
  }
);

// Routes
app.use("/user", loginRouters);
app.use(notfound);
app.use(errorHandling);

const PORT = process.env.PORT || 5050;

// Listening
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
