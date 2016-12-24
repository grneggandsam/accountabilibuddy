var express = require('express');
var router = express.Router();


/*
 * GET listings.
 */
router.get('/goals', function(req, res) {
    var db = req.db;
    var collection = db.get('goals');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

router.get('/findusergoals', function(req, res) {
    var db = req.db;
    var collection = db.get('goals');
    collection.find({},{},function(e,docs){
        console.log("No Name sent...");
        res.json(docs);
    });
});

router.get('/findusergoals/:user', function(req, res) {
  console.log("hit find user data")
  var db = req.db;
  var collection = db.get('goals');
  console.log("got db");
  var user = req.params.user;
  console.log("searching for: " + user);
  collection.find({ 'user' : user , 'step' : '#primary'}, {}, function(e,docs){
    if(e === null) {
      res.json(docs);
    }
  });
});

router.get('/findbuddygoals/:buddy', function(req, res) {
  console.log("hit find buddy goals");
  var buddy = req.params.buddy;
  var db = req.db;
  var collection = db.get('goals');
  console.log("buddy is: " + buddy);
  collection.find({ 'buddies' : buddy , 'step' : '#primary' }, {}, function(e,docs){
    if(e === null) {
      console.log(docs);
      res.json(docs);
    }
    else {
      res.msg = "none";
    }
  });
});

router.get('/findgoal/:user/:goal', function(req, res) {
  var db = req.db;
  var collection = db.get('goals');
  var user = req.params.user;
  var goal = req.params.goal;

  collection.find({ 'user' : user, 'goal' : goal, 'step' : {$ne: '#primary'} }, {}, function(e,docs){
    if(e === null) {
      if(docs[0] != null) {
        console.log(docs);
        res.json(docs);
      }
      else {res.send( { msg: "No Goal Found."} )}
    }
  });

});

/*
 * POST to add goal.
 */
router.post('/addstep', function(req, res) {
    var db = req.db;
    var pCorrect = false;
    var collection2 = db.get('goals');
    console.log("user: ");
    user = req.body[0].user;
    console.log(user);
    console.log("password: ");
    password = req.body[1].password;
    console.log(password);
    // console.log(docs[0].password);
    var collection = db.get('userlist');
    collection.find( {'username' : user, 'password' : password}, {}, function(err, docs) {
        if (docs[0].password == password) {
          console.log("password match");
          pCorrect = true;
          collection2.insert(req.body[0], function(err, result){
              res.send(
                  (err === null) ? { msg: '' } : { msg: err }
              );
          });
        }
    });
});

/*
 * POST to add users to goal.
 */
router.post('/addusers', function(req, res) {
    var db = req.db;
    var collection2 = db.get('goals');
    console.log("user: ");
    user = req.body[0].user;
    console.log(user);
    console.log("buddy: ");
    password = req.body[1].password;
    console.log(req.body[0].buddies);
    // console.log(docs[0].password);
    var collection = db.get('userlist');
    collection.find( {'username' : user, 'password' : password}, {}, function(err, docs) {
        if (docs[0].password == password) {
          console.log("password match");
          collection2.update(
            { 'user' : req.body[0].user, 'goal' : req.body[0].goal, 'step' : '#primary' },
            { $addToSet: { 'buddies' : req.body[0].buddies } }
          );
        }
    });
});

/*
 * DELETE to deletelisting.
 */
router.delete('/deletestep/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('goals');
    var listingToDelete = req.params.id;
    collection.remove({ '_id' : listingToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});


module.exports = router;
