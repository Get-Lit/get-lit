const Room = require('../models/room.model')
const Comment = require('../models/comment.model')

module.exports.profile = (req, res, next) => {
    res.render('profile');
}

// Post a comment in a room
module.exports.doComment = (req, res, next) => {
    const roomId = req.params.id;
    const userId = req.user.id;
    const content = req.body.content;

    console.log('Antes de crear el comentario')
    console.log(roomId)
    console.log(userId)
    console.log(content)

    Comment.create({
        room: roomId,
        user: userId,
        content: content
    })
    .then((createdComment) => {
        console.log('Después de crear el comentario.')
        res.redirect(`/rooms/${roomId}`)
    })
    .catch(error => next(error))
}