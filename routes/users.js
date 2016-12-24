var express = require('express');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

router.post('/login/:email/:password', function(req, res) {
  var db = req.db;
  var collection = db.get('userlist');
  var emailn = req.params.email;
  var password = req.params.password;
  collection.find({ 'email' : emailn }, { 'email' : { $exists : true }}, function(e,docs){
    if(e === null) {
      if(docs[0] != null) {
        if(password == docs[0].password) {
          console.log("password match");
          res.send( docs[0] );
        }
        else {res.send( { msg: "x"} )}
      }
      else {res.send( { msg: "x"} )}
    }
  });
});

/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
})

/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

router.get('/getuser/:email', function(req, res) {
  console.log("hit getuser")
  var db = req.db;
  var collection = db.get('userlist');
  var email = req.params.email;
  collection.find({ 'email' : email }, {}, function(e,docs){
    if(e === null) {
      if(docs[0] != null) {
        res.json(docs);
      }
      else {res.send( { msg: "No Buddies."} )}
    }
  });
});

router.get('/getBuddies/:email', function(req, res) {
  console.log("hit getBuddies")
  var db = req.db;
  var collection = db.get('userlist');
  var email = req.params.email;
  collection.find({ 'email' : email }, {}, function(e,docs){
    if(e === null) {
      if(docs[0] != null) {
        res.json(docs);
      }
      else {res.send( { msg: "No Buddies."} )}
    }
  });
});

module.exports = router;
