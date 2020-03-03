const express = require('express');
const morgan = require('morgan');
var admin = require('firebase-admin');
var serviceAccount = require('../../soccerpoint-21d24-firebase-adminsdk-no6eb-71dd62c611');


const app = express();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://soccerpoint-21d24.firebaseio.com"
});

const db = admin.database();

//settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.use(require('./routes/index'));

//starting the server
app-this.listen(app.get('port'), () => {

});