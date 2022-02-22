const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Title is required',
    },
    author: {
        type: String,
        required: 'Author is required',
    },
    year: {
        type: Number
    },
    pages: {
        type: Number
    },
    genre: {
        type: String
    },
    synopsis: {
        type: String,
        maxlength: [300, 'Synopsis has to be less than 300 characters']
    },
    reviews: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;