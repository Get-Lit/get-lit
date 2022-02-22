const express = require('express');
const passport = require('passport');
const router = express.Router();

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
router.get('/signup', auth.signup)
router.post('/signup', auth.doSignup)

// Log in Routes

module.exports = router;