const mongoose = require('mongoose');

const stringParams = {type: String, required: true};
const manuSchema = new mongoose.Schema({
    id: stringParams,
    name: stringParams,
    keywords: [String]
});

module.exports = mongoose.model('Manufacturer', manuSchema);