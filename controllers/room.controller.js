const mongoose = require('mongoose');
const { resolveHostname } = require('nodemailer/lib/shared');
const Book = require('../models/book.model');
const Room = require('../models/room.model');
const Participant = require('../models/participant.model');
const Comment = require('../models/comment.model');


// Show all rooms
module.exports.list = (req, res, next) => {
    Room.find()
        .populate({ path: 'participants', populate: { path: 'user' }})
        .populate({ path: 'book comments' })
        .then(rooms => {
            res.render('rooms/list', { rooms });
        })
        .catch(error => next(error));
};


// Show details of specific room
module.exports.detail = (req, res, next) => {
    Room.findById(req.params.id)
        .populate({ path: 'comments', populate: { path: 'user'}})
        .populate({ path: 'comments', populate: { path: 'replies', populate: { path: 'user' }}})
        .populate({ path: 'participants', populate: { path: 'user' }})
        .populate({ path: 'book' })
        .then(room => {
            return Participant.find({ user: req.user.id })
                .then(participants => {
                    res.render('rooms/detail', { room, participants })
                })
        })
        .catch(error => next(error));
};


// Create new room
module.exports.create = (req, res, next) => {
    Book.find()
        .then(books => {
                res.render('rooms/createRoom', { books });
        })
        .catch(error => next(error))
};

module.exports.createFromBook = (req, res, next) => {
    Book.find()
        .then(books => {
            return Book.findById(req.params.id)
                .then(book => {
                    res.render('rooms/createRoom', { books, book });
                })
        })
        .catch(error => next(error))
};

module.exports.doCreate = (req, res, next) => {
    const room = req.body;

    Room.findOne({ name: room.name })
        .then(roomFound => {
            if(roomFound){
                return Book.find()
                    .then(books => {
                        res.render('rooms/createRoom', { errors: { 
                            name: 'Room name already in use.'
                        }, room: roomFound, books });
                    })
            } if (room.book === "Select a Book") {
                return Book.find()
                    .then(books => {
                        res.render('rooms/createRoom', { errors: { 
                            book: 'You need to select a book.'
                        }, room: roomFound, books });
                    })
            } else {
                return Room.create(room)
                    .then((room) => {
                        res.redirect(`/rooms/${room._id}`);
                    })
            };
        })
        .catch(error => next(error));
};

module.exports.delete = (req, res, next) => {
    Room.findByIdAndDelete(req.params.id)
        .then(() => {
            return Participant.deleteMany({ room: req.params.id })
            .then(() => {
                req.flash('flashMessage', 'Room successfully deleted.');
                res.redirect('/rooms');
            })
        })
        .catch(error => next(error));
};

module.exports.edit = (req, res, next) => {
    Room.findById(req.params.id)
        .then((roomFound) => {
            res.render('rooms/edit', { room: roomFound });
        })
        .catch(error => next(error));
};

module.exports.doEdit = (req, res, next) => {
    Room.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true } )
        .then((roomFound) => {
            req.flash('flashMessage', 'Room successfully edited.');
            res.redirect(`/rooms/${roomFound._id}`);
        })
        .catch(error => next(error));
};