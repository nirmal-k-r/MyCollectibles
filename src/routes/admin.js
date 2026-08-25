//imports
const express = require('express');
const Product = require('../models/products');
const bcrypt = require('bcrypt');

//create router
const router = express.Router();

//Get admin dashboard
router.get('/', async (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        res.redirect('/');
    }else{
        products = await Product.find({});
        ctx={  
            message: "None",
            products: products
        };
        if (req.query.message == 'created') {
            ctx.message = 'Product created successfully!';
        }
        if (req.query.message == 'deleted') {
            ctx.message = 'Product deleted successfully!';
        }
        if (req.query.message == 'updated') {
            ctx.message = 'Product updated successfully!';
        }   
        if (req.query.message == 'notfound') {
            ctx.message = 'Product not found!';
        }
        if (req.query.message == 'error') {
            ctx.message = 'An error occurred!';
        }

        res.render('admin/dashboard',ctx);
    }
});

//Get product details page
router.get('/product/:id', async (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        res.redirect('/');
    }else{
        try {
            const product = await Product.find({ _id: req.params.id });
            if (!product) {
                res.redirect('/admin?message=notfound');
            }else{
                ctx = {
                    product: product[0],
                };
                res.render('admin/details', ctx);
            }

        } catch (error) {
            console.error(error);
            res.status(400).send('Unable to load product');
        }

    }


});

//Query parameter http://localhost:3000?id=34451627829
//Request parameter http://localhost:3000/34451627829 (used here) [url parameter]

//Create product
router.post('/create-product', async (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.status(403).send('403 Forbidden');
    }

    try {
        let name=req.body.name;
        let description=req.body.description;
        let price=req.body.price;
        let category=req.body.category;
        let image=req.body.image;
        let stock=req.body.stock;

        // to create the product in one line 
        // await Product.create({
        //     name: req.body.name,
        //     description: req.body.description,
        //     price: req.body.price,
        //     category: req.body.category,
        //     image: req.body.image,
        //     stock: req.body.stock
        // });

        newProduct = new Product({
            name: name,
            description: description,
            price: price,
            category: category,
            image: image,
            stock: stock
        });

        await newProduct.save();

        res.redirect('/admin?message=created');
    } catch (error) {
        console.error(error);
        res.status(400).send('Unable to create product');
    }
});

//Delete product
router.get('/delete-product/:id', async (req, res) => {
    let id=req.params.id;
    if (!req.session.user || req.session.user.role !== 'admin') {
       res.redirect('/');
    }else{
        try{
            // await Product.findByIdAndDelete(id);
            product=await Product.findOne({_id:id});
            await product.deleteOne();
            res.redirect('/admin?message=deleted');
        } catch (error) {
            res.redirect('/admin?message=error');
        }
    }

   
});

//Update product
router.post('/product/:id/update', async (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
       res.redirect('/');
    }else{
        let id=req.params.id;
        let name=req.body.name;
        let description=req.body.description;
        let price=req.body.price;
        let category=req.body.category;
        let image=req.body.image;
        let stock=req.body.stock;
        
        try {
            const product = await Product.findOne({ _id: id });
            if (!product) {
                res.redirect('/admin?message=notfound');
            }else{
                product.name = name;
                product.description = description;
                product.price = price;
                product.category = category;
                product.image = image;
                product.stock = stock;
                
                await product.save();
                res.redirect('/admin?message=updated');
            }  
        } catch (error) {
            console.error(error);
            res.redirect('/admin?message=error');
        }
    }
    
});

//export the router
module.exports = router;
