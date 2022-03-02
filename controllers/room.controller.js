const mongoose = require('mongoose');
const { resolveHostname } = require('nodemailer/lib/shared');
const Book = require('../models/book.model');
const Room = require('../models/room.model');
const Comment = require('../models/comment.model');


// Show all rooms
module.exports.list = (req, res, next) => {
    Room.find()
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
        .then(room => {
            console.log(room.comments)
            res.render('rooms/detail', { room })
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
            req.flash('flashMessage', 'Room successfully deleted.')
            res.redirect('/rooms');
        })
        .catch(error => next(error));
}