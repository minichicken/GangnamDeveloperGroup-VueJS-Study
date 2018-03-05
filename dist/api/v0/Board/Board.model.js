'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var Comment = new Schema({
    name: { type: String },
    comment: { type: String }
});

var BoardSchema = new Schema({
    name: { type: String },
    date: { type: String },
    content: { type: String },
    comment: [Comment]
});

exports.default = _mongoose2.default.model('Board', BoardSchema);