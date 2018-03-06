import User from './User.model'
import passport from 'passport'

export function loginUser(req, res, next) {
    passport.authenticate('local-login', {
        successRedirect: '/products',
        failureRedirect: '/',
        failureFlash: true
    })
}

export function createUser(req, res, next) {
    User.create(req.body, (err, user) => {
        if (err) {
            return next(err)
        }
        res.status(200).json(user)
    })
}

export function findUser(req, res, next) {
    User.find((err, users) => {
        if (err) {
            return next(err)
        }
        res.json(users)
    })
}

export function findUserById(req, res, next) {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            return next(err)
        }
        res.json(user)
    })
}

export function updateUser(req, res, next) {
    User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (err) {
            return next(err)
        }
        res.json(user)
    })
}

export function removeUser(req, res, next) {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.send('no user')
        }
        res.json(user)
    })
}
