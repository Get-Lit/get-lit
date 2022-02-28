const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const replySchema = new Schema({
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
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
}, { timestamps: true });

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;