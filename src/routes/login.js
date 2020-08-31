const { Router } = require('express');
const router = Router();
const firebase = require('firebase');

var isClient = false;
var isBar = false;
 
router.post('/api/signOut'), (req, rep) => {
    firebase.auth().signOut().then(function(){
        console.log("Sign out")
        rep.send(true)
    }, function(error){
        console.log(error)
        rep.send(error)
    });
}

router.post('/api/loginApp', (req, rep)=>{
    firebase.auth().signInWithEmailAndPassword(req.body.Email, req.body.Password)
    .then(() => {
        getUserType(req.body.Email).then(() => {
            if (isClient){
                rep.send(200, 0);
            } else if (isBar){
                rep.send(200, 1);
            }
        });
    })
    .catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        rep.status(403).send(errorMessage);
    })
})

async function getUserType(email){
    var bar;

    await firebase.database().ref('pubs').orderByChild('Email').equalTo(email).once('value').then((snapshot) => {
        bar = snapshot.val();
    });

    if (bar != null) {
        isBar = true
    } else {
        var client;

        await firebase.database().ref('users').orderByChild('Email').equalTo(email).once('value').then((snapshot) => {
            client = snapshot.val();
        })

        if( client != null){
            isClient = true
        }
    }
}

module.exports = router;