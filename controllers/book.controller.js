const mongoose = require('mongoose');
const Book = require('../models/book.model');


// List all books
module.exports.list = (req, res, next) => {
    Book.find()
        .then((books) => res.render('books/list', { books }))
        .catch(error => next(error));
}


// Show details of one book
module.exports.detail = (req, res, next) => {
    Book.findById(req.params.id)
        .then((book) => {
            if(book) {
                res.render('books/detail', { book });
            } else {
                res.redirect('/books');
            }
        })
        .catch(error => next(error));
}


// Show rooms for specific book
module.exports.rooms = (req, res, next) => {
    Book.findById(req.params.id)
        .populate('rooms')
        .then(book => {
            console.log(book.rooms);
            res.render('rooms/list', { rooms: book.rooms, book });
        })
        .catch(error => next(error));
}