var express = require("express");
var router = express.Router();
var User = require("../models/User");
var bcrypt = require("bcrypt");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// register a user 
router.post("/register", async (req, res) => {
  try {
    var user = await User.create(req.body);
    var token = await user.signToken();
    res.redirect("/");
  } catch (error) {
    res.status(500).json(error);
  }
});
// login a user
router.post("/login", async (req, res) => {
  var { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Both email and password are required" });
  }
  try {
    var user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ error: " this email is not registered" });
    }
    var isMatched = await bcrypt.compare(req.body.password, user.password);
    if (!isMatched) {
      return res.status(400).json({ error: "Password is not matched " });
    }
    var token = await user.signToken();
    return res.send(token);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;