const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    rate: {
        type: Number,
        required: false
    }
}, { timestamps: true });

commentSchema.virtual('replies', {
    ref: 'Reply',
    localField: '_id',
    foreignField: 'comment',
    justOne: false
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;