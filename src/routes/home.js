//Express router

//imports
const express = require('express');
const Product = require('../models/products');

//create router
const router = express.Router();

//setup routes

//home route
router.get('/', async (req, res) => {
    try {
        const categories = await Product.distinct('category');
        const availableCategories = categories
            .filter(Boolean)
            .sort((a, b) => a.localeCompare(b));

        res.render('home/home', {
            categories: availableCategories,
        });
    } catch (error) {
        console.error('Error loading home page categories:', error);
        res.render('home/home', {
            categories: []
        });
    }
});


//get products
//query params: page, limit, category, keyword
router.get('/products', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 8, 20);
    const keyword = req.query.keyword ? req.query.keyword.trim() : '';
    const category = req.query.category && req.query.category !== 'all' ? req.query.category.trim() : '';

    let searchParams = {};

    if (category) {
        searchParams.category = { $regex: category, $options: 'i' };
    }

    if (keyword) {
        const keywordFilter = { name: { $regex: keyword, $options: 'i' } };

        if (Object.keys(searchParams).length > 0) {
            searchParams = {
                $and: [searchParams, keywordFilter]
            };
        } else {
            searchParams = keywordFilter;
        }
    }

    try {
        const totalProducts = await Product.countDocuments(searchParams);
        const products = await Product.find(searchParams)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        res.json({
            products,
            page,
            hasMore: page * limit < totalProducts
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ products: [], hasMore: false });
    }
});



router.get('/about', async (req, res) => {  
   
    ctx={
        description: "MyCollectibles is a web application that allows users to manage and showcase their personal collections of various items. Users can create an account, add items to their collection, and view their collection in a visually appealing way.",
    }
    res.render('home/about',ctx)
});



//export the router
module.exports = router;
