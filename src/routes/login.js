const { Router } = require('express');
const router = Router();
const firebase = require('firebase');

router.get('/api/login', (req, rep)=>{
    firebase.auth().singInWithEmailAndPassword(req.body.email, req.body.password).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        rep.send(errorCode, errorMessage);
    })
    rep.send(true);
})

module.exports = router;