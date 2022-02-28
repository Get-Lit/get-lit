const mongoose = require('mongoose');
const Book = require('../models/book.model');
const axios = require('axios');


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

// Add new books
module.exports.add = (req, res, next) => {
    res.render('books/createBook');
}

module.exports.search = (req, res, next) => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.query.title}&inauthor=${req.query.author}&intitle=${req.query.title}`)
        .then(response => {
            const books = response.data.items;
            res.render('books/createBook', { books });
        })
        .catch(error => console.log(error))
}

module.exports.doAdd = (req, res, next) => {
    console.log(req.body.id);
    const bookId = req.body.id;

    axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
        .then(response => {
            const book = response.data;
            const year = parseInt(book.volumeInfo.publishedDate.slice(0, 4));
            
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
        })
        .catch(error => next(error));
}