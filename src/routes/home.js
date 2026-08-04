//Express router

//imports
const express = require('express');

//create router
const router = express.Router();

//setup routes

//home route
router.get('/', (req, res) => {
    res.send('Welcome to MyCollectibles!');
});

router.get('/about', (req, res) => {  
      
    ctx={
        description: "MyCollectibles is a web application that allows users to manage and showcase their personal collections of various items. Users can create an account, add items to their collection, and view their collection in a visually appealing way."
    }
    res.render('home/about',ctx)
});



//export the router
module.exports = router;
