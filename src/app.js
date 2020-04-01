var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var admin = require('firebase-admin');
var serviceAccount = require('../../soccerpoint-21d24-firebase-adminsdk-no6eb-9ccd718194.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://soccerpoint-21d24.firebaseio.com"
});
var db = admin.database();

//settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

//routes
app.use(require('./routes/pubs'));
app.use(require('./routes/users'));

//starting the server
// app.this.listen(app.get('port'), () => {

// });

module.exports = app;