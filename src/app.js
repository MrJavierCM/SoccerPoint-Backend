var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');

var firebase = require('firebase/app');

var firebaseConfig = {
    apiKey: "AIzaSyBf6Hvnh8lOp81C41v_62CmXR3yrZvWs0I",
    authDomain: "soccerpoint-21d24.firebaseapp.com",
    databaseURL: "https://soccerpoint-21d24.firebaseio.com",
    projectId: "soccerpoint-21d24",
    storageBucket: "soccerpoint-21d24.appspot.com",
    messagingSenderId: "897308303346",
    appId: "1:897308303346:web:8275e3f741c7838eff956b",
    measurementId: "G-P97Z9308EL"
}

firebase.initializeApp(firebaseConfig);

//settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//app.use(cors());

// app.use((req, res, next) => {
//      res.header('Access-Control-Allow-Origin', '*');
//      res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
//      res.header('Access-Control-Allow-Origin', 'GET, POST, OPTIONS, PUT, DELETE');
//      res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//      next();
// })

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'URLs to trust of allow');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if ('OPTIONS' == req.method) {
    res.sendStatus(200);
    } else {
      next();
    }
  });


//routes
app.use(require('./routes/pubs'));
app.use(require('./routes/users'));
app.use(require('./routes/login'));


//starting the server
// app.this.listen(app.get('port'), () => {

// });

module.exports = app; 