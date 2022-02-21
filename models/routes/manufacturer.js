const express = require('express');
const router = express.Router();
const Manufacturer = require('../models/manufacturer');

// Write new manufacturers
router.post('', (req, res)=>{
    const manu = {
        id: req.body.id,
        name: req.body.name,
        keywords: req.body.keywords
    }

    new Manufacturer(manu).save()
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

// get manufacturers
router.get('', (req, res)=>{

  const manus = req.query.manufacturerIds;

  console.log(manus);
  var query = {}
  if (manus !== undefined)
      query["id"] = manus;

  console.log(query["manufacturerId"]);

    Manufacturer.find(query)
    .then(async (doc) =>{
        if (doc.length > 0)
        {
            res.status(201).json({
                found: true,
                manufacturers: doc
            });
        }
        else
        {
            res.status(201).json({
                found: false,
                message: "there are no manufacturers"
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
