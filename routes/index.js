var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.cookies);


  if(req.cookies.loggedIn == "true") {

    var db = req.db;
    var collection = db.get('goals');
    var collection2 = db.get('userlist');
    var email = req.cookies.email;
    collection2.find({ 'email' : email }, {}, function(e2,docs2){
      if(e2 === null) {
        collection.find({ 'user' : docs2[0].username , 'step' : '#primary'}, {}, function(e,docs){
          if(e === null) {
            console.log(docs);
            res.render('goals', { title: 'goals', goals: docs });
          }
        });
      }
    });

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
