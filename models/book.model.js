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
    cover: {
        type: String,
        default: "https://www.abbeville.com/assets/common/images/edition_placeholder.png"
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
    },
    reviews: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    // rooms: {
    //     type: [ mongoose.Schema.Types.ObjectId ],
    //     ref: 'Room'
    // }
}, { timestamps: true, 
    toJSON: {
        virtuals: true
    } });

bookSchema.virtual('rooms', {
    ref: 'Room',
    localField: '_id',
    foreignField: 'book',
    justOne: false
})

bookSchema.virtual('likes', {
    ref: 'Like',
    localField: '_id',
    foreignField: 'book',
    justOne: false
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;