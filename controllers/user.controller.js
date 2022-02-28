const Comment = require('../models/comment.model')
const User = require('../models/user.model');
const Reply = require('../models/reply.model')

const axios = require('axios');

module.exports.profile = (req, res, next) => {
    res.render('profile');
}

// Post a comment in a room
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