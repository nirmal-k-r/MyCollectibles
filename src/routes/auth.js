//imports
const express = require('express');
const User = require('../models/users');
const bcrypt = require('bcrypt');

//create router
const router = express.Router();

async function regenerateToken(user){
    const token_base=user.email+user.password+Date.now().toString();
    let token=await bcrypt.hash(token_base,10); 

    let updatedUser = await User.findOneAndUpdate({email: user.email}, {token: token}, {new: true});
    return updatedUser;


    // await user.findAndUpdate({email: user.email}, {token: token}, {new: true}, (err, updatedUser) => {
    //     if (err) {
    //         console.error('Error updating token:', err);
    //     } else {
    //         console.log('Token updated successfully for user:', updatedUser.email);
    //     }
    // });
}

//setup routes

router.get('/', (req, res) => {
    res.redirect('/auth/login');
});

//render login page
router.get('/login', (req, res) => {
    ctx={};
    res.render('auth/login',ctx);
});

//render register page
router.get('/register', (req, res) => {
    const ctx = {
        error: req.query.error
    };
    res.render('auth/register', ctx);
});

router.get('/logout', (req, res, next) => {
    req.session.destroy(error => {
        if (error) {
            return next(error);
        }
        res.redirect('/');
    });
});

//handle login form submission
router.post('/login', async (req, res) => {
    const email=req.body.email;
    const password=req.body.password;

    //find the user by email
    const user=await User.findOne({email: email});
    if (!user) {
        res.redirect('/auth/login?error=Invalid%20email%20or%20password');
    }else{
        //compare the provided password with the hashed password
        const isMatch=await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.redirect('/auth/login?error=Invalid%20email%20or%20password');
        }else{
            //login successful, create a session
            let updatedUser = await regenerateToken(user); //regenerate token on login

            let {
                password,
                ...savedUser
            }=updatedUser.toObject();

            // console.log('User logged in:', savedUser);

            req.session.user=savedUser;
            res.redirect('/');
        }
    }
});




//handle register form submission
router.post('/register', async (req, res) => {
    const email=req.body.email;
    const pwd=req.body.password;
    const name=req.body.name;
    const role='user';
    const address=req.body.address;
    const phone=req.body.phone;

    //hash the password
    let hashedPassword=await bcrypt.hash(pwd,10);
    
    //create a token
    let token_base=email+pwd+Date.now().toString();
    let token=await bcrypt.hash(token_base,10); //create a token


    //create a new user
    let newUser= new User({email:email, password:hashedPassword, token:token, name:name, role:role, address:address, phone:phone});
    let createdUser=await newUser.save(); //save the newUser object to database

    let {
        password,
        ...savedUser
    }=createdUser.toObject();

    // savedUser={
    //     email: createdUser.email,
    //     name: createdUser.name,
    //     role: createdUser.role,
    //     address: createdUser.address,
    //     phone: createdUser.phone,
    //     token: createdUser.token
    // }

    req.session.user=savedUser;

    if (createdUser) {
        res.redirect('/');
    } else {
        res.redirect('/auth/register?error=Registration%20failed.%20Please%20try%20again.');
    }
});


router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
});




//export the router
module.exports = router;
