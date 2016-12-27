var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.cookies);
  if(req.cookies.loggedIn == "true") {
    console.log("logged in");
    res.render('goals', { title: 'goals' });
  }
  else {
    res.render('index', { title: 'Influencey' });
  }
});

/* GET home page. */
router.get('/api', function(req, res, next) {
  res.render('api', { title: 'API' });
});

module.exports = router;
