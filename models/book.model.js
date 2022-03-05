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
        default: "https://res.cloudinary.com/ddu4a2pzu/image/upload/v1646488530/get-lit/no-cover_atepnu.png"
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