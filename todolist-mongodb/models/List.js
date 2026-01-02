const mongoose = require('mongoose');
const {itemSchema} = require('../models/Item');

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Campo Obrigatório']
    },
    items: [itemSchema]
});

module.exports = mongoose.model('List', listSchema);