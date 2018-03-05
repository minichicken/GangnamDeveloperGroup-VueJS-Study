'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var UserSchema = new Schema({
    username: { type: String, required: true, minlength: 8 },
    realname: { type: String, required: true },
    password: { type: String }
});

exports.default = _mongoose2.default.model('User', UserSchema);