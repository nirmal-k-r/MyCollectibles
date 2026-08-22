//Main express application file which will be imported by server.js

//Imports
const express = require('express');
const db= require('./config/db');
const session = require('express-session');
const bodyParser = require('body-parser');

//Router imports
const homeRouter = require('./routes/home');
const authRouter = require('./routes/auth');
// const adminRouter = require('./routes/admin');


//Create express app
const app = express();

//Middleware
//link to the views folder
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//link to the public folder
app.use(express.static('public'));

//logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

//session middleware
app.use(session({
    secret: 'gvdhj%^23bd9n%DHYWUD',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.use((req, res, next) => {
    res.locals.globals = {
        session: req.session
    };
    next();
});

//Routers
app.use('/', homeRouter);
app.use('/auth', authRouter);
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