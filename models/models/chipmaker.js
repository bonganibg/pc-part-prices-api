const mongoose = require('mongoose');

const stringParams = {type: String, required: true};
const chipmakerSchema = new mongoose.Schema({
    id: stringParams,
    name: stringParams,
    keywords: [String]
});

module.exports = mongoose.model('Chipmaker', chipmakerSchema);
