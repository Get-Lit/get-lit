const express = require('express');
const passport = require('passport');
const router = express.Router();

const SCOPES = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
]

// Controllers
const misc = require('../controllers/misc.controller');
const auth = require('../controllers/auth.controller');
const user = require('../controllers/user.controller');
const book = require('../controllers/book.controller');
const room = require('../controllers/room.controller');

// Middlewares
const { isAuthenticated, isNotAuthenticated } = require('../middlewares/auth.middleware');

// Misc Routes
router.get('', misc.home);
router.get('/about', misc.about);
router.get('/contact', misc.contact);

// Sign up Routes
router.get('/signup', isNotAuthenticated, auth.signup);
router.post('/signup', isNotAuthenticated, auth.doSignup);

router.get('/activate/:token', isNotAuthenticated, auth.activate);

// Log in Routes
router.get('/login', isNotAuthenticated, auth.login);
router.post('/login', isNotAuthenticated, auth.doLogin);

router.get('/login/google', isNotAuthenticated, passport.authenticate('google-auth', { scope: SCOPES  }));
router.get('/auth/google/callback', isNotAuthenticated, auth.doLoginGoogle);

router.get('/logout', isAuthenticated, auth.logout);

// Profile Routes
router.get('/profile', isAuthenticated, user.profile);


// Book Routes
router.get('/books', book.list)
router.get('/books/:id', book.detail)

module.exports = router;