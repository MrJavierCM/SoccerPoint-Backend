const express = require('express');
const morgan = require('morgan');

const app = express();

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
// app.this.listen(app.get('port'), () => {

// });

module.exports = app;