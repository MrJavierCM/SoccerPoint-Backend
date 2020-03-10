const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');
const serviceAccount = require('../../../soccerpoint-21d24-firebase-adminsdk-no6eb-9ccd718194.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://soccerpoint-21d24.firebaseio.com"
});

var db = admin.database();

router.get('/api/users', (req, res)=>{
    res.json;
});


router.post('/api/new-pub', (req, res) =>{
    var newPub = {
        name: 'Prueba',
        address: 'c/Test',
        number: 1
    }
    db.ref('pubs').push(newPub);
    res.send('Prueba recibida');
})
module.exports = router;