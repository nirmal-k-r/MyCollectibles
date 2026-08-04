//Main express application file which will be imported by server.js

//Imports
const express = require('express');
// const db= require('./config/db');


//Router imports

//Create express app
const app = express();

//Middleware




//Routers


//test route
app.get('/', (req, res) => {
    res.send('Welcome to MyCollectibles web app');1
});


app.get('/about', (req, res) => {
    res.send('About page');
});

app.get('/contact', (req, res) => {
    res.send('Contact page');
});

//export the app
module.exports = app;
