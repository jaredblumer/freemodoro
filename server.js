const express = require("express");
const path = require("path");
const app = express();
const User = require("./models/User");
const mongoose = require("mongoose");

// Load environment variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const MONGO_URI = process.env.MONGO_URI;
const MONGO_DB_USER = process.env.MONGO_DB_USER;
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;

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

app.listen(process.env.PORT || 8080, () =>
  console.log("Freemodoro server listening.")
);
