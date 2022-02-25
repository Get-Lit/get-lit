const mongoose = require('mongoose')
const Book = require('../models/book.model')

// List all books
module.exports.list = (req, res, next) => {
    Book.find()
        .then((books) => res.render('books/list', { books }))
        .catch(err => next(err))
}

module.exports.detail = (req, res, next) => {
    Book.findById(req.params.id)
        .then((bookFound) => {
            if(bookFound) {
                res.render('books/detail', { book: bookFound })
            } else {
                res.redirect('/books')
            }
        })
        .catch(err => next(err))
}