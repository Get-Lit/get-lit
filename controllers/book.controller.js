const mongoose = require('mongoose');
const Book = require('../models/book.model');
const Like = require('../models/like.model');
const axios = require('axios');


// List all books
module.exports.list = (req, res, next) => {
    if(res.locals.currentUser) {
        Like.find({ user: req.user.id })
            .then(likes => {
                return Book.find()
                    .then((books) => res.render('books/list', { books, likes }))
            })
            .catch(error => next(error));
    } else {
        Book.find()
            .then((books) => res.render('books/list', { books }))
            .catch(error => next(error));
    }
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

// Add new books
module.exports.add = (req, res, next) => {
    res.render('books/createBook');
}

module.exports.search = (req, res, next) => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.query.title || req.query.author}&inauthor=${req.query.author}&intitle=${req.query.title}`)
        .then(response => {
            const books = response.data.items;
            res.render('books/createBook', { books });
        })
        .catch(error => console.log(error))
}

module.exports.doAdd = (req, res, next) => {
    const bookId = req.body.id;

    axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
        .then(response => {
            console.log(response.data)
            const book = response.data;
            let year = "";
            if(book.volumeInfo.publishedDate) {
                year = parseInt(book.volumeInfo.publishedDate.slice(0, 4));
            }
            
            return Book.findOne({ title: book.volumeInfo.title })
                .then(bookFound => {
                    if(!bookFound){
                        return Book.create({
                            title: book.volumeInfo.title,
                            author: book.volumeInfo.authors[0],
                            cover: book.volumeInfo.imageLinks.thumbnail,
                            year: year,
                            pages: book.volumeInfo.pageCount,
                            synopsis: book.volumeInfo.description,
                        })
                            .then((bookCreated) => {
                                res.redirect(`/books/${bookCreated._id}`);
                            })
                    } else {
                        req.flash('flashMessage', 'This book already exists.');
                        res.redirect(`/books/${bookFound._id}`);
                    }
                })
        })
        .catch(error => next(error));
};

module.exports.delete = (req, res, next) => {
    Book.findByIdAndDelete(req.params.id)
        .then(() => {
            req.flash('flashMessage', 'Book successfully deleted.')
            res.redirect('/books');
        })
        .catch(error => next(error));
}

module.exports.edit = (req, res, next) => {
    Book.findById(req.params.id)
        .then((bookFound) => {
            res.render('books/edit', { book: bookFound });
        })
        .catch(error => next(error));
};

module.exports.doEdit = (req, res, next) => {
    Book.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true } )
        .then((bookFound) => {
            req.flash('flashMessage', 'Book successfully edited.');
            res.redirect(`/books/${bookFound._id}`);
        })
        .catch(error => next(error));
};