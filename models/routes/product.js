const express = require('express');
const req = require('express/lib/request');
const Products = require('../models/product');
const router = express.Router();


router.post('', (req,res,next) =>
{
    console.log(req.query);
    const product = {
        id: req.body.id,
        name: req.body.name,
        categoryId: req.body.categoryId,
        currentPrice: req.body.currentPrice,
        manufacturerId :req.body.manufacturerId,
        storeId: req.body.storeId,
        imageUri: req.body.imageUri,
        priceHistory: req.body.priceHistory,
        productUrl: req.body.productUrl,
        categorySpecific: req.body.categorySpecific
    }
    new Products(product).save()
    .then(results => {
        console.log(product);
        res.status(201).json({
            message: "Posted successfully"
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.put('', (req, res, next) =>{
    const product = {
        id: req.body.id,
        name: req.body.name,
        categoryId: req.body.categoryId,
        currentPrice: req.body.currentPrice,
        manufacturerId :req.body.manufacturerId,
        storeId: req.body.storeId,
        imageUri: req.body.imageUri,
        priceHistory: req.body.priceHistory,
        productUrl: req.body.productUrl,
        categorySpecific: req.body.categorySpecific
    }

    Products.updateOne({_id: req.query._id}, product)
    .then(() => {
        res.status(201).json({
            message: "product has been updated"
        });
    })
    .catch((error)=>{
        res.status(401).json({
            message: "not updated",
            error: error
        });
    });
});

// Get Requets
router.get('', (req, res) =>{
    // Get search query
    const store_id = req.query.store_id;
    const price = req.query.price;
    const manu = req.query.manu;
    const prodID = req.query.prodID;
    const category = req.query.category;
    var min = req.query.min;
    var max = req.query.max;


    // Search filters
    const manufacturers = req.query.manufacturers;
    const search = req.query.search;
    const order = req.query.order;

    console.log("ORder: " +  order);

    // Check if there are search filters
    var query = {}
    if (store_id !== undefined)
        query["storeId"] = store_id;

    if (price !== undefined)
        query["currentPrice"] = price;

    if (manu !== undefined)
        query["manufacturerId"] = manu

    if (prodID !== undefined)
        query["id"] = prodID;



    // Search terms
    if (category !== undefined)
        query["categoryId"] = category;

    if (category !== undefined)
        query["categoryId"] = category;

    if (min == undefined)
        min = 0;

    if (max == undefined)
        max = 1000000;

    if (manufacturers !== undefined)
        query["manufacturerId"] = manufacturers;

    if (search !== undefined){
      let regex = new RegExp(search,'i');
      query["name"] = regex;
    }


    Products.find(query)
    .where('currentPrice').gte(min).lte(max)
    .sort({currentPrice: order})
    .then(async (prod)=>{
        console.log(query)

        if (prod.length > 0)
        {

            res.status(201).json({
                // page: page,
                // size: size,
                product: prod,
            })
        }
        else{
            res.status(404).json({
                products: prod,
                message: "data not found"
            });
        }
    })
    .catch(err =>
        {
            res.status(401).json({
                message: "Something went wrong"
            });
        });
});

module.exports = router;
