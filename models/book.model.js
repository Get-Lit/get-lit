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
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.researchpad.co%2Farticle%2Fdoi%2F10.1016%2Fj.semerg.2020.05.004&psig=AOvVaw30cz2MoJWgpqMjCpqQIGTq&ust=1646438143545000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNCAxZeSq_YCFQAAAAAdAAAAABAD"
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