const mongoose = require('mongoose');
const User = require('../models/user.model');
const passport = require('passport');
const mailer = require('../config/mailer.config');


// Sign up controllers
module.exports.signup = (req, res, next) => {
    res.render('auth/signup');
}

module.exports.doSignup = (req, res, next) => {
    const user = req.body;

    const renderWithErrors = (errors) => {
        res.render('auth/signup', { errors, user });
    }

    User.findOne({ email: user.email })
        .then((userFound) => {
            if (userFound) {
                renderWithErrors({ email: 'Email already in use.' })
            } else {
                return User.findOne({name: user.name})
                    .then((userFound) => {
                        if (userFound) {
                            renderWithErrors({ name: 'Name already in use.' })
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
                
            }
        })
        .catch (error => {
            if (error instanceof mongoose.Error.ValidationError) {
                renderWithErrors(error.errors)
            } else {
                next(error)
            }
        })
    
        /* User.findOne({ $or: [ { email: user.email }, { name: user.name } ] })
        .then((userFound) => {
            if (userFound) {
                renderWithErrors({ email: 'Email already in use.', name: 'Name already in use.' })
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
        }) */
};

// Activate controller
module.exports.activate = (req, res, next) => {
    const activationToken = req.params.token;
  
    User.findOneAndUpdate(
      { activationToken, active: false },
      { active: true }
    )
      .then(() => {
        res.redirect('/login')
      })
      .catch(err => next(err))
}


// Login Controllers
module.exports.login = (req, res, next) => {
    res.render('auth/login');
};

const login = (req, res, next, provider) => {
    passport.authenticate(provider || 'local-auth', (error, user, validations) => {
        if(error){
            next(error);
        } else if(!user) {
            res.status(404).render('auth/login', { errors: { email: validations.error } });
        } else {
            req.login(user, (loginError) => {
                if(loginError){
                    next(loginError);
                } else {
                    res.redirect('/profile');
                }
            })
        }
    })(req, res, next);
};

module.exports.doLogin = (req, res, next) => {
    login(req, res, next);
};

module.exports.doLoginGoogle = (req, res, next) => {
    login(req, res, next, 'google-auth');
}

module.exports.logout = (req, res, next) => {
    req.logout();
    res.redirect('/login');
}