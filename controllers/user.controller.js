const Comment = require('../models/comment.model')
const User = require('../models/user.model');

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
        username: user.name,
        userimage: user.image,
        content: content
    })
    .then((createdComment) => {
        res.redirect(`/rooms/${roomId}`)
    })
    .catch(error => next(error))
}