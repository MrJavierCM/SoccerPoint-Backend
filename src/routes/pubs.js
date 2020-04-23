const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');
const db = admin.database();

router.get('/api/pubs', (req, res) => {
 var reference = db.ref('/pubs');
 reference.on("value", function(snapshot){
     console.log(snapshot.val());
     res.json(snapshot.val())
     reference.off("value")
  },
   function(errorObject){
    res.send("The read failed: " + errorObject.code);
  })
});

router.post('/api/new-pub', (req, res) => {
  var name = req.body.Nickname;
  db.ref('pubs').child(name).set(req.body);
})
module.exports = router;