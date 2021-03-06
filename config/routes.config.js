const express = require('express');
const passport = require('passport');
const router = express.Router();
const upload = require('../config/storage.config');

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
const { isAdmin } = require('../middlewares/roles.middleware');

// Misc Routes
router.get('', misc.home);
router.get('/about', misc.about);
router.get('/contact', misc.contact);
router.get('/find-bookshops', misc.findBookshops);

// Sign up Routes
router.get('/signup', isNotAuthenticated, auth.signup);
router.post('/signup', isNotAuthenticated, upload.single('image'), auth.doSignup);

router.get('/activate/:token', isNotAuthenticated, auth.activate);

// Log in Routes
router.get('/login', isNotAuthenticated, auth.login);
router.post('/login', isNotAuthenticated, auth.doLogin);

router.get('/login/google', isNotAuthenticated, passport.authenticate('google-auth', { scope: SCOPES  }));
router.get('/auth/google/callback', isNotAuthenticated, auth.doLoginGoogle);

router.get('/logout', isAuthenticated, auth.logout);

// User Routes
router.get('/profile', isAuthenticated, user.profile);
router.get('/profile/edit', isAuthenticated, user.edit);
router.post('/profile/edit', isAuthenticated, upload.single('imageEdited'), user.doEdit);
router.post('/participant/:id', isAuthenticated, user.addParticipant);
router.post('/comment/:id/reply', isAuthenticated, user.doReply);
router.post('/comment/:id/delete', isAuthenticated, user.deleteComment);
router.post('/comment/:id', isAuthenticated, user.doComment);
router.post('/like/:id/delete', isAuthenticated, user.deleteLike)
router.post('/like/:id', isAuthenticated, user.doLike);

// Book Routes
router.get('/books', book.list);
router.get('/books/:id/rooms', book.rooms);
router.get('/books/create', book.add);
router.get('/books/search', book.search);
router.post('/books/create', isAuthenticated, book.doAdd);
router.get('/books/:id/edit', isAuthenticated, isAdmin, book.edit);
router.post('/books/:id/edit', isAuthenticated, isAdmin, book.doEdit);
router.post('/books/:id/delete', isAuthenticated, isAdmin, book.delete);
router.get('/books/:id', isAuthenticated, book.detail);

// Room Routes
router.get('/rooms', room.list);
router.get('/rooms/create', isAuthenticated, room.create);
router.get('/rooms/:id/create', isAuthenticated, room.createFromBook);
router.post('/rooms/create', isAuthenticated, room.doCreate);
router.get('/rooms/:id/edit', isAuthenticated, isAdmin, room.edit);
router.post('/rooms/:id/edit', isAuthenticated, isAdmin, room.doEdit);
router.post('/rooms/:id/delete', isAuthenticated, isAdmin, room.delete);
router.get('/rooms/:id', isAuthenticated, room.detail);

module.exports = router;