//Express router

//imports
const express = require('express');
const Product = require('../models/products');
const Purchase = require('../models/purchases');

//create router
const router = express.Router();

//setup routes


//sample cart
// const sampleCart = {
//     10000391yagds: 2,
//     10000392yagds: 1
// };

//get cart
router.get('/', async (req, res) => {
    if (!req.session.cart){
        req.session.cart = {};
    } 
    
    for (itemID in req.session.cart){
        let product = await Product.findById(itemID);
        cart[itemID] = {
            product: product,
            quantity: req.session.cart[itemID]
        };
    }
    console.log(cart);
    res.json(cart);

});


//add item to cart
router.post('/add', async (req, res) => {
    const itemID = req.body.itemID;
    const quantity = parseInt(req.body.quantity) || 1;

    if (!req.session.cart) { //if cart is not initialised
        req.session.cart = {
            itemID: quantity
        };
    }else{
        req.session.cart[itemID] = (req.session.cart[itemID] || 0) + quantity;
    }

    res.json({ message: 'Success'});
});


//remove item from cart
router.get('/delete/:id', async (req, res) => {
    const itemID = req.params.id;

    if (req.session.cart && req.session.cart[itemID]) {
        delete req.session.cart[itemID];
        res.json({ message: 'Success' });
    } else {
        res.status(404).json({ message: 'Failure' });
    }
});


//update item quantity in cart
router.post('/update', async (req, res) => {
    const itemID = req.body.itemID;
    const quantity = parseInt(req.body.quantity);

    if (!req.session.cart) {
        req.session.cart = {};
    }

    if (itemID in req.session.cart) {
        req.session.cart[itemID] = quantity;
    }

    res.json({ message: 'Success' });
});


//checkout route
router.get('/checkout', async (req, res) => {
    if (req.session.user){
        if (!req.session.cart || Object.keys(req.session.cart).length == 0) {
            res.redirect('/');
        }else{
            // Process the checkout
            let cartItems = [];
            let totalAmount = 0;
            
            for (const itemID in req.session.cart) {
                const product = await Product.findById(itemID);
                if (product) {
                    const quantity = req.session.cart[itemID];
                    cartItems.push({ product, quantity });
                    totalAmount += product.price * quantity;
                }
            }

            // Create a new purchase record
            const newPurchase = new Purchase({
                user: req.session.user._id,
                products: cartItems.map(item => ({
                    product: item.product._id,
                    quantity: item.quantity
                })),
                totalAmount: totalAmount,
                status: 'pending'
            });
            await newPurchase.save();
            res.redirect('/cart/confirmation/' + newPurchase._id);
        }
    }else{
        res.redirect('/auth/login');
    }
});


//get confirmation page
router.get('/confirmation/:id', async (req, res) => {
    if (req.session.user){
        purchases = await Purchase.findById(req.params.id).populate('products.product');
        const ctx = {
            user: req.session.user,
            purchases: purchases
        };
     
        
        res.render('cart/confirmation', ctx);
    }else{
        res.redirect('/auth/login');
    }
});

//export the router
module.exports = router;
