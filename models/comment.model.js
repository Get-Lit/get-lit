const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    title: {
        type: String,
        required: true,
        minLength: [5, 'The name must contain at least 5 characters.']
    },
    content: {
        type: String,
        required: true,
        minlength: [100, 'You  must write at least 100 characters.']
    },
    rate: {
        type: Number,
        required: false
    }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;