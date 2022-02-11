const express = require('express');
const router = express.Router();
const Chipmaker = require('../models/chipmaker');

// Write new Chipmaker
router.post('', (req, res)=>{
    const chip = {
        id: req.body.id,
        name: req.body.name,
        keywords: req.body.keywords
    }

    new Chipmaker(chip).save()
    .then((result) =>{        
        res.status(201).json({
            message: "information has been saved",
            manu: result 
        });
    })
    .catch(err =>{
        res.status(401).json({            
            error: err
        });
    });
});

// get Chipmaker
router.get('', (req, res)=>{

    Chipmaker.find()
    .exec()
    .then((doc) =>{
        if (doc.length > 0)
        {
            res.status(201).json({
                found: true,
                chipmaker: doc
            });
        }
        else
        {
            res.status(201).json({
                found: false,
                message: "there are no chipmaker"
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