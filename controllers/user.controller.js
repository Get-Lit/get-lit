const Comment = require('../models/comment.model')
const Reply = require('../models/reply.model');
const Like = require('../models/like.model');
const Participant = require('../models/participant.model');
const User = require('../models/user.model');


// Render user information
module.exports.profile = (req, res, next) => {
    User.findById(req.user.id)
        .populate({ path: 'rooms', populate: { path: 'room', populate: { path: 'participants', populate: { path: 'user'  }}}})
        .populate({ path: 'likes', populate: { path: 'book' }})
        .then(user => {
            res.render('profile', { rooms: user.rooms, books: user.likes });
        })
        .catch(error => next(error));
};

module.exports.edit = (req, res, next) => {
    User.findById(req.user.id)
        .populate({ path: 'rooms', populate: { path: 'room', populate: { path: 'participants', populate: { path: 'user'  }}}})
        .populate({ path: 'likes', populate: { path: 'book' }})
        .then(user => {
            res.render('profile', { rooms: user.rooms, books: user.likes, edit: true });
        })
        .catch(error => next(error));
};

module.exports.doEdit = (req, res, next) => {
    if (req.file) {
        req.body.image = req.file.path;

        User.findByIdAndUpdate(req.user.id, { image: req.body.image, name: req.body.name})
            .then(() => {
                req.flash('flashMessage', 'You updated your profile.');
                res.redirect("/profile");
            })
            .catch(error => next(error));
    } else {
        User.findByIdAndUpdate(req.user.id, { name: req.body.name})
            .then(() => {
                req.flash('flashMessage', 'You updated your profile.');
                res.redirect("/profile");
            })
            .catch(error => next(error));
    }
};

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

module.exports.deleteLike = (req, res, next) => {
    Like.findByIdAndDelete(req.params.id)
        .then(() => {
            req.flash('flashMessage', 'Book removed from your list.')
            res.redirect('/profile');
        })
        .catch(error => next(error));
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

// Join and Leave a room
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