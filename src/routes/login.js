const { Router } = require('express');
const router = Router();
const firebase = require('firebase');

var isClient = false;
var isBar = false;
 
router.get('/api/signOut', (req, rep) => {
    firebase.auth().signOut().then(function(){
        rep.send(true)
    }, function(error){
        console.log(error)
        rep.send(error)
    });
})

router.post('/api/loginApp', (req, rep)=>{
    firebase.auth().signInWithEmailAndPassword(req.body.Email, req.body.Password)
    .then(() => {
        getUserType(req.body.Email).then(() => {
            console.log(isClient)
            if (isClient){
                rep.send(200, 0);
                isClient = false;
            } else if (isBar){
                rep.send(200, 1);
                isBar = false;
            }
        });
    })
    .catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        rep.send([errorCode, errorMessage]);
    })
})

async function getUserType(email){
    var bar;
    console.log(email)
    await firebase.database().ref('pubs').orderByChild('Email').equalTo(email).once('value').then((snapshot) => {
        bar = snapshot.val();
    });
    console.log(bar)
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