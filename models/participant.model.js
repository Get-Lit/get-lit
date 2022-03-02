const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const participantSchema = new Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Participant = mongoose.model('Participant', participantSchema);
module.exports = Participant;