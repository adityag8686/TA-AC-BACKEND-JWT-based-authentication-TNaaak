var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/api/dashboard", auth.verifyUser, async (req, res) => {
  try {
    res.send(" protected access");
  } catch (err) {
    res.redirect("/");
  }
});

module.exports = router;
