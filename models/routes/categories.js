const express = require('express');
const router = express.Router();
const Category = require('../models/categories');

// Write new category
router.post('', (req, res)=>{
    const category = {
        id: req.body.id,
        name: req.body.name
    }

    new Category(category).save()
    .then((result) =>{        
        res.status(201).json({
            message: "information has been saved",
            cate: result 
        });
    })
    .catch(err =>{
        res.status(401).json({            
            error: err
        });
    });
});

// get categories
router.get('', (req, res)=>{

    Category.find()
    .exec()
    .then((doc) =>{
        if (doc.length > 0)
        {
            res.status(201).json({
                found: true,
                categories: doc
            });
        }
        else
        {
            res.status(201).json({
                found: false,
                message: "there are no categories"
            });
        }
    })
    .catch((err)=>{
        res.status(401).json({
            found: false,
            message: err
        })
    });
});




module.exports = router;