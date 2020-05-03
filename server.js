const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const User = require("./models/User");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const withAuth = require("./middleware");

app.use(bodyParser.json());
app.use(cookieParser());

// Load environment variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const MONGO_URI = process.env.MONGO_URI;
const MONGO_DB_USER = process.env.MONGO_DB_USER;
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;
const TOKEN_SECRET = process.env.TOKEN_SECRET;

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect(
  MONGO_URI,
  {
    auth: {
      user: MONGO_DB_USER,
      password: MONGO_DB_PASSWORD
    }
  },
  function(err) {
    if (err) {
      throw err;
    } else {
      console.log("Successfully connected to mongo database.");
    }
  }
);

app.use(express.static(path.join(__dirname, "build")));

app.post("/api/register", function(req, res) {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save(function(err) {
    if (err) {
      res.status(500).send("Error registering new user.");
    } else {
      res.status(200).send("User registered successfully.");
    }
  });
});

app.post("/api/authenticate", function(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal error."
      });
    } else if (!user) {
      res.status(401).json({
        error: "Incorrect email or password."
      });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500).json({
            error: "Internal error."
          });
        } else if (!same) {
          res.status(401).json({
            error: "Incorrect email or password."
          });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, TOKEN_SECRET, {
            expiresIn: "1h"
          });
          res.cookie("token", token, { httpOnly: true }).sendStatus(200);
        }
      });
    }
  });
});

app.get("/api/checkToken", withAuth, function(req, res) {
  res.sendStatus(200);
});

app.listen(process.env.PORT || 8080, () =>
  console.log("Freemodoro server listening.")
);
