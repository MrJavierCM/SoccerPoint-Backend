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
    res.send(true)})
  .catch(function(error){
    var errorCode = error.code;
    var errorMessage = error.message;
    res.send(errorCode, errorMessage);
  })
});


router.post('/api/login', (req,res)=>{
  var email = req.body.Email;
  var password = req.body.Password;
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function(){
    res.send(true)
  })
  .catch(function(){
    res.send(false)
  })
})

router.post('/api/infoUser', (req, res)=>{
  var reference = firebase.database().ref('users');
  reference.orderByChild("Nickname").equalTo(req.body.Nickname).on('value',function(snapshot){
      res.send(snapshot.val());
      reference.off("value")
  });
})

module.exports = router;