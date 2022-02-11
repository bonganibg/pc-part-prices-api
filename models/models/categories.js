const mongoose = require('mongoose');

const stringParams = {type: String, required: true};
const categorySchema = mongoose.Schema({
    id: stringParams,
    name: stringParams,
});

module.exports = mongoose.model('Category', categorySchema);