const mongoose = require('mongoose');
const User = require('../models/user.model');
const passport = require('passport');

module.exports.signup = (req, res, next) => {
    res.render('auth/signup');
}

module.exports.doSignup = (req, res, next) => {
    const user = req.body;

    const renderWithErrors = (errors) => {
        res.render('auth/signup', { errors, user });
    }

    User.findOne({ email: user.email, username: user.username })
        .then((userFound) => {
            if (userFound.email) {
                renderWithErrors({ email: 'Email already in use.' })
            } else if (userFound.username) {
                renderWithErrors({ username: 'Username not available.' })
            } else {
                if (req.file) {
                    user.image = req.file.path
                } else {
                return User.create(user)
                    .then((createdUser) => {
                        mailer.sendActivationEmail(createdUser.email, createdUser.activationToken)
                        res.redirect('/login')
                    })
                }
                
            }
        })
        .catch (error => {
            if (error instanceof mongoose.Error.ValidationError) {
                renderWithErrors(error.errors)
            } else {
                next(error)
            }
        })
}