'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
    name: {type: String},
    comment: {type: String}
});

const BoardSchema = new Schema({
    name: { type: String },
    date: { type: String },
    content: { type: String },
    comment: [Comment]
});

module.exports = mongoose.model('Board', BoardSchema);
