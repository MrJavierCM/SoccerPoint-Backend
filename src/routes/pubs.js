const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');
const db = admin.database();

router.get('/api/pubs', (req, res)=>{
    res.json;
});

router.post('/api/new-pub', (req, res) =>{
    db.ref('pubs').push(req);
})
module.exports = router;