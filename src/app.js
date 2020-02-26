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

//middlewares

//routes


module.exports = app;