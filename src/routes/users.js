const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');
const db = admin.database();

router.post('/api/new-user', (req, res)=>{
    console.log(req.body);
    db.ref('users').push(req.body);
    console.log('Usuario recibido');
});

module.exports = router;