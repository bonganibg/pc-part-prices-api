const express = require('express');
const Stores = require('../models/stores');
const router = express.Router();

// Write the store infromation
router.post('', (req, res) =>{
    const store = {
        id: req.body.id,
        name: req.body.name,
        logoUri: req.body.logoUri,
        siteUrl: req.body.siteUrl
    }
    new Stores(store).save()
    .then(result => {
        res.status(201).json({
            message: "Store information written",
            result: result
        });
    })    
    .catch(err =>{
        res.status(401).json({
            error: err
        });
    })
});

// get the store information
router.get('', (req, res) => {
    Stores.find()
    .then((doc) =>{
        if (doc.length > 0)
        {
            res.status(201).json({
                found: true,
                stores: doc
            });
        }
        else{
            res.status(201).json({
                found: false,
                message: "There are no stores"
            });
        }
    })
    .catch(err => {
        res.status(401).json({
            found: false,
            message: err
        })
    });
});

module.exports = router;