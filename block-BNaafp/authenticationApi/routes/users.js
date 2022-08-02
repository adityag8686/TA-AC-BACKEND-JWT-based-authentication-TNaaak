var express = require('express');
var router = express.Router();
var User = require("../models/users");
var bcrypt = require("bcrypt");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// register

router.post("/register", async (req, res) => {
  try {
    let user = await User.create(req.body);
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
});

// login through postman or any 3rd party

router.post("/login", async (req, res) => {
  var { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Both the fields required" });
  }
  try {
    var user = await User.create(req.body);
    if (!user) {
      return res.status(400).json({ error: " this email is not registered" });
    }
    var result = await bcrypt.compare(req.body.password, user.password);
    // if the password is not matched
    if (!result) {
      return res.status(400).json({ error: "Password is incorrect " });
    }
    if(result){
      return res.status(200).json(user);
    }
    } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
