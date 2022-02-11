const mongoose = require('mongoose');

const stringParams = {type: String, required: true}; // Make certain text based thing mandiroty
const numParams = {type: Number, required: true}; // Make some number based things manditory
const productSchema = new mongoose.Schema({
    id: stringParams,
    categoryId: stringParams,
    name: stringParams,
    currentPrice: numParams,
    manufacturerId: stringParams,
    storeId: stringParams,
    imageUri: stringParams,
    productUrl: String,
    priceHistory: {
        date: String,
        price: Number 
    },
    categorySpecific: {}
});

module.exports = mongoose.model('Products', productSchema);
