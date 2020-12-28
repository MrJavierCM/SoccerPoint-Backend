const { Router } = require('express');
const router = Router();
const firebase = require('firebase');

router.get('/api/users', (req, res) => {
  var reference = firebase.database().ref('/users');
  reference.on("value", function(snapshot){
    res.json(snapshot.val())
      reference.off("value")
  },
  function(errorObject){
    res.send("The read failed: " + errorObject.code);
  })
});

router.post('/api/new-user', (req, res)=>{
  var email = req.body[0].Email;
  var nick = req.body[0].Nickname;
  var password = req.body[1];
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(){
    firebase.database().ref('users').child(nick).set(req.body[0]);    
    firebase.database().ref('nicks').child(nick).set({"Nick": nick});
    res.status(200).send(true)
  })
  .catch(function(error){
    var errorCode = error.code;
    var errorMessage = error.message;
    res.send([errorCode, errorMessage]);
  })
});

router.post('/api/infoUser', (req, res)=>{
  var reference = firebase.database().ref('users');
  reference.orderByChild("Nickname").equalTo(req.body.Nickname).on('value',function(snapshot){
      res.send(snapshot.val());
      reference.off("value")
  });
})

router.post('/api/new-comment', (req, res)=>{
  var reference = firebase.database().ref('pubs');
  reference.child(req.body[0]).child('Comments').child(req.body[1].User).set(req.body[1])
  .then(function(){
    res.send(true);
  });
})

router.post('/api/userByEmail', (req, res) => {
  var reference = firebase.database().ref('users');
  reference.orderByChild("Email").equalTo(req.body.Email).on('value',function(snapshot){
      res.send(snapshot.val());
      reference.off("value")
  });
})

router.post('/api/likeDish', (req, res) => {
  var reference = firebase.database().ref('pubs');
  var addLike = req.body[1].Positive + 1
  reference.child(req.body[0]).child("Menu").child(req.body[1].Name).child("Positive").set(addLike)
  .then(function(){
    res.send(true);
  });
})

router.post('/api/dislikeDish', (req, res) => {
  var reference = firebase.database().ref('pubs');
  var addDislike = req.body[1].Negative + 1
  reference.child(req.body[0]).child("Menu").child(req.body[1].Name).child("Negative").set(addDislike)
  .then(function(){
    res.send(true);
  });
})

module.exports = router; 