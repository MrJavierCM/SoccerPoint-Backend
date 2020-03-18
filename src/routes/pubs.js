const { Router } = require('express');
const router = Router();

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
    res.json(newPub);
})
module.exports = router;