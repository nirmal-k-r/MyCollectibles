//Main express application file which will be imported by server.js

//Imports
const express = require('express');
const db= require('./config/db');


//Router imports
const homeRouter = require('./routes/home');
// const authRouter = require('./routes/auth');
// const adminRouter = require('./routes/admin');

//Create express app
const app = express();

//Middleware

//link to the views folder
app.set('views', './src/views');
app.set('view engine', 'ejs');

//link to the public folder
app.use(express.static('public'));

//logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});



//Routers
app.use('/', homeRouter);
// app.use('/auth', authRouter);
// app.use('/admin', adminRouter);


//error handling
app.use((req, res, next) => {
    res.status(404).send('404 Page Not Found');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('500 Internal Server Error');
});


//export the app
module.exports = app;
