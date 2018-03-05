'use strict';
const User = require('./User.model');

module.exports = {
    createUser: (req, res, next) => {
        User.create(req.body, (err, user) => {
            if (err) { return next(err); }
            res.status(200).json(user);
        });
    },
    findUser: (req, res, next) => {
        User.find((err, users) => {
            if (err) { return next(err); }
            res.json(users);
        });
    },
    findUserById: (req, res) => {
        User.findById(req.params.id, (err, user) => {
            if (err) { return next(err); }
            res.json(user);
        });
    },
    updateUser: (req, res) => {
        User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
            if (err) { return next(err); }
            res.json(user);
        })
    },
    removeUser: (req, res, next) => {
        User.findByIdAndRemove(req.params.id, (err, user) => {
            if (err) { return next(err); }
            if (!user) { return res.send('no user') }
            res.json(user);
        });
    }
}
