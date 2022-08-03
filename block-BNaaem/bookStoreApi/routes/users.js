var express = require("express");
var router = express.Router();
var User = require("../models/User");
var bcrypt = require("bcrypt");
var { token } = require("morgan");


// register user 

router.post("/register", async (req, res) => {
  try {
    var user = await User.create(req.body);
    res.status(201).json({ user: user });
  } catch (error) {
    res.status(500).json(error);
  }
});


// login 

router.post("/login", async (req, res) => {
  var { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Both email and password are required" });
  }
  try {
    var user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ error: " this email  not registered" });
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