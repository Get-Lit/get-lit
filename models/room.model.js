const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        minlength: [30, 'Description has to be at least 30 characters long.']
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    },
    participants: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    }
}, { timestamps: true,
    toJSON: {
        virtuals: true
    } });

roomSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'room',
    justOne: false
})

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;

