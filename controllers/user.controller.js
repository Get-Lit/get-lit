const Comment = require('../models/comment.model')
const Reply = require('../models/reply.model');
const Like = require('../models/like.model');
const Participant = require('../models/participant.model')

module.exports.profile = (req, res, next) => {
    res.render('profile');
}

// Post comments and replies in a room
module.exports.doComment = (req, res, next) => {
    const roomId = req.params.id;
    const user = req.user;
    const content = req.body.content;

    Comment.create({
        room: roomId,
        user: user.id,
        content: content
    })
    .then(() => res.redirect(`/rooms/${roomId}`))
    .catch(error => next(error))
}

module.exports.doReply = (req, res, next) => {
    const roomId = req.body.id;
    const user = req.user;
    const content = req.body.content;
    const comment = req.params.id;

    Reply.create({
        room: roomId,
        user: user.id,
        content,
        comment
    })
    .then(() => res.redirect(`/rooms/${roomId}`))
    .catch(error => next(error))
}

// Like books
module.exports.doLike = (req, res, next) => {
    const bookId = req.params.id;
    const userId = req.user.id;

    Like.findOneAndDelete({ book: bookId, user: userId })
        .then((like) => {
            if (like) {
                res.status(200).send({ success: 'Liked removed from DB.'});
            } else {
                return Like.create({
                    book: bookId,
                    user: userId
                })
                .then(() => {
                    res.status(200).send({ success: 'Liked created in DB.'});
                })
            }
        })
        .catch(error => next(error))
}


// Delete comments and replies
module.exports.deleteComment = (req, res, next) => {
    const roomId = req.body.id

    Comment.findByIdAndDelete(req.params.id)
        .then((commentFound) => {
            if (commentFound) {
                res.redirect(`/rooms/${roomId}`)
            } else {
                return Reply.findByIdAndDelete(req.params.id)
                    .then(() => res.redirect(`/rooms/${roomId}`))
            }
        })
        .catch(error => next(error))
}

module.exports.addParticipant = (req, res, next) => {
    const roomId = req.params.id;
    const userId = req.user.id;

    Participant.findOneAndDelete({ room: roomId, user: userId })
        .then(participant => {
            if(participant) {
                res.status(200).send({ success: true});
            } else {
                return Participant.create({
                    room: roomId,
                    user: userId
                })
                .then(() => {
                    res.status(200).send({ success: false});
                })
            }
        })
        .catch(error => next(error))
};