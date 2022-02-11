const mongoose = require('mongoose');

const stringParams = {type: String, required: true};
const storeSchema = new mongoose.Schema({
    id: stringParams,
    name: stringParams,
    logoUri: stringParams,
    siteUrl: stringParams
});

module.exports = mongoose.model('Stores', storeSchema);