const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    },
    participants: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    creationDate: {
        type: Date,
    }
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;

