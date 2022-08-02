var express = require('express');
var router = express.Router();
var auth = require("../middlewares/auth");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/api/dashboard", auth.verifyUser, async (req, res) => {
  try {
    res.send(" protected access");
  } catch (error) {
    res.redirect("/");
  }
});
module.exports = router;
