const { Router } = require('express');
const router = Router();
const firebase = require('firebase');

router.get('/api/pubs', (req, res) => {
 var reference = firebase.database().ref('/pubs');
 reference.on("value", function(snapshot){
     res.json(snapshot.val())
     reference.off("value")
  },
   function(errorObject){
    res.send("The read failed: " + errorObject.code);
  })
});

router.post('/api/new-pub', (req, res)=>{
  var email = req.body[0].Email;
  var nick = req.body[0].Nickname;
  var password = req.body[1];
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(){
    firebase.database().ref('pubs').child(nick).set(req.body[0]);
    res.send(true)})
  .catch(function(error){
    var errorCode = error.code;
    var errorMessage = error.message;
    res.send(errorCode, errorMessage);
   })
   
});


router.post('/api/pubsByLocation', (req, res) => {
  const pubs = [];
  var reference = firebase.database().ref('pubs');
  reference.orderByChild("Location").equalTo(req.body.Name).on('value',function(snapshot){
    snapshot.forEach(childSnapshot => {
      pubs.push(childSnapshot.val());
    });
      res.header("Access-Control-Allow-Origin", "*");
      res.send(pubs);
      reference.off("value")
  });
})

router.post('/api/pubsByNick', (req, res) => {
  var reference = firebase.database().ref('pubs');
  reference.orderByChild("Nickname").equalTo(req.body.Nickname).on('value',function(snapshot){
      res.send(snapshot.val());
      reference.off("value")
  }); 
})

router.post('/api/pubsByEmail', (req, res) => {
  const pubs = [];
  var reference = firebase.database().ref('pubs');
  reference.orderByChild("Email").equalTo(req.body.Email).on('value',function(snapshot){
      snapshot.forEach(childSnapshot => {
        pubs.push(childSnapshot.val())
      })
      res.send(pubs);
      reference.off("value")
  });
})

router.post('/api/editProfile', (req, res) => {
    var reference = firebase.database().ref('pubs');
    reference.child(req.body[1]).set(req.body[0]);
    res.send(true);
})

module.exports = router;