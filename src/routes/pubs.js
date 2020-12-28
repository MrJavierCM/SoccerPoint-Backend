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
    firebase.database().ref('nicks').child(nick).set({"Nick": nick})
    res.status(200).send(true);
  })
  .catch(function(error){
    var errorCode = error.code;
    var errorMessage = error.message;
    res.send([errorCode, errorMessage]);
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

router.post('/api/pubByEmail', (req, res) => {
  console.log(req.body)
  const pubs = [];
  var reference = firebase.database().ref('pubs');
  reference.orderByChild("Email").equalTo(req.body.Email).on('value',function(snapshot){
      res.send(snapshot.val());
      reference.off("value")
  });
})

router.post('/api/editProfile', (req, res) => {
    var reference = firebase.database().ref('pubs');
    reference.child(req.body[1]).set(req.body[0]);
    res.send(true);
})

router.post('/api/commentsByPub', (req, res) => {
  var nick = req.body.Nickname;
  var reference = firebase.database().ref('pubs');
  reference.orderByChild('Nickname').equalTo(nick).on('value',function(snapshot){
    valueJSON = snapshot.toJSON()
    console.log(valueJSON[nick].Comments)
    res.send(valueJSON[nick].Comments);
    reference.off("value")
  })
})

router.post('/api/addDish', (req, res) => {
  var reference = firebase.database().ref('pubs');
  reference.child(req.body[0]).child('Menu').child(req.body[1].Name).set(req.body[1])
  .then(function(){
    res.send(true);
  });
})

router.post('/api/menu', (req, res) => {
  var nick = req.body.Nickname;
  var reference = firebase.database().ref('pubs');
  reference.orderByChild('Nickname').equalTo(nick).on('value',function(snapshot){
    valueJSON = snapshot.toJSON()
    res.send(valueJSON[nick].Menu);
    reference.off("value")
  })
})

router.post('/api/addSales', (req, res)=>{
  var reference = firebase.database().ref('pubs');
  reference.child(req.body[0]).child('Sales').child(req.body[1].Name).set(req.body[1])
  .then(function(){
    res.send(true);
  });
})

router.post('/api/getSales', (req, res) => {
  var nick = req.body.Nickname;
  var reference = firebase.database().ref('pubs');
  reference.orderByChild('Nickname').equalTo(nick).on('value',function(snapshot){
    valueJSON = snapshot.toJSON()
    res.send(valueJSON[nick].Sales);
    reference.off("value")
  })
})

router.post('/api/deleteSale', (req, res) => {
  var pubNick = req.body[1]
  var reference = firebase.database().ref('pubs');
  reference.child(pubNick).child('Sales').child(req.body[0].Name).remove().then(
    res.status(200).send(true)
  ).catch(
    res.send(false)
  )
})

router.post('/api/deleteDish', (req, res) => {
  var pubNick = req.body[1]
  var reference = firebase.database().ref('pubs');
  reference.child(pubNick).child('Menu').child(req.body[0].Name).remove().then(
    res.send(true)
  ).catch(
    res.send(false)
  )
})

router.post('/api/checkNick', (req, res) => {
  var nick = req.body.Nickname;
  var reference = firebase.database().ref('nicks');
  reference.child(nick).once('value', function(snapshot){
    console.log(snapshot.val())
    if(snapshot.val() == null){
      console.log("entra")
      res.send(false);
    } else {
      console.log("existe")
      res.send(true);
    }
    reference.off("value")
  })
})

router.post('/api/voteTeam', (req, res) => {
  console.log(req.body)
  var pubNick = req.body[0]
  var team = req.body[1]
  var reference = firebase.database().ref('pubs');
  reference.child(pubNick).child("Teams").child(team).once('value', function(snapshot){
    if(snapshot.val()== null){
      reference.child(pubNick).child("Teams").child(team).set({"Team": team,"Votes": 1})
      res.send(true)
    }
    else {
      reference.child(pubNick).child("Teams").child(team).child("Votes").once('value', function(snapshot){
        var numVotes = (snapshot.val() + 1)
        console.log(numVotes)
        reference.child(pubNick).child("Teams").child(team).child("Votes").set(numVotes)
        reference.off("value")
      })
      res.send(false)
    }
    reference.off("value")    
  })
})
 
router.post('/api/teamsVotes', (req, res) =>{
  var nick = req.body.Nickname;
  console.log(nick)
  var reference = firebase.database().ref('pubs');
  reference.orderByChild('Nickname').equalTo(nick).on('value',function(snapshot){
    valueJSON = snapshot.toJSON()
    console.log(valueJSON)
    res.send(valueJSON[nick].Teams);
    reference.off("value")
  })
})

module.exports = router;