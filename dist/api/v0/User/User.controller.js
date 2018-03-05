'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createUser = createUser;
exports.findUser = findUser;
exports.findUserById = findUserById;
exports.updateUser = updateUser;
exports.removeUser = removeUser;

var _User = require('./User.model');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createUser(req, res, next) {
    _User2.default.create(req.body, function (err, user) {
        if (err) {
            return next(err);
        }
        res.status(200).json(user);
    });
}

function findUser(req, res, next) {
    _User2.default.find(function (err, users) {
        if (err) {
            return next(err);
        }
        res.json(users);
    });
}

function findUserById(req, res, next) {
    _User2.default.findById(req.params.id, function (err, user) {
        if (err) {
            return next(err);
        }
        res.json(user);
    });
}

function updateUser(req, res, next) {
    _User2.default.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
        if (err) {
            return next(err);
        }
        res.json(user);
    });
}

function removeUser(req, res, next) {
    _User2.default.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send('no user');
        }
        res.json(user);
    });
}