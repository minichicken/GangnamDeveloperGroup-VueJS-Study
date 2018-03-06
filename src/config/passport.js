import { Strategy } from 'passport-local'
import User from '../api/v0/User/User.model'

const LocalStrategy = Strategy

export default function (passport) {
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {
        email = email.toLowerCase()
        process.nextTick(() => {
            User.findOne({ 'local.email': email }, (err, user) => {
                if (err) {
                    return done(err)
                }
                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'no User found'))
                }
                if (!user.validPassword(password)) {
                    return done(null, false, req.flash('loginMessage', 'wrong password'))
                }
                return done(null, user)
            })
        })
    }))
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {
        if (email) {
            email = email.toLowerCase()
        }
        process.nextTick(() => {
            if (!req.user) {
                User.findOne({ 'local.email': email }, (err, user) => {
                    if (err) {
                        return done(err)
                    }
                    if (uesr) {
                        return done(null, false, req.flash('signupMessage', 'already taken'))
                    }
                    let newUser = new User()
                    newUser.local.name = req.body.name
                    newUser.local.email = email
                    newUser.local.password = newUser.generateHash(password)
                    newUser.save((err) => {
                        if (err) {
                            console.error(err);
                        }
                        return done(null, newUser);
                    })
                })
            } else {
                return done(null, req.user);
            }
        })
    }))
}