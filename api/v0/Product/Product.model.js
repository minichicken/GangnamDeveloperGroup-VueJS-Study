'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {type: String},
    price: {type: Number},
    info: String
});

module.exports = mongoose.model('Product', ProductSchema);
