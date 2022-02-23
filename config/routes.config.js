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
const authMiddleware = require('../middlewares/auth.middleware');

// Misc Routes
router.get('', misc.home);

// Sign up Routes
router.get('/signup', auth.signup);
router.post('/signup', auth.doSignup);

router.get('/activate/:token', auth.activate);

// Log in Routes
router.get('/login', auth.login);
router.post('/login', auth.doLogin);

router.get('/login/google', passport.authenticate('google-auth', { scope: SCOPES  }));
router.get('/auth/google/callback', auth.doLoginGoogle);

router.get('/logout', auth.logout);





// Profile Routes
router.get('/profile', user.profile);

module.exports = router;