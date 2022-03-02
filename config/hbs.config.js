const hbs = require('hbs');

hbs.registerPartials('./views/partials');

hbs.registerHelper('userLikedBook', function(options) {
    const { book, likes } = options.hash;

    if (book && likes && likes.some(like => like.book == book.id)) {
        return options.fn(this)
    } else {
        return options.inverse(this)
    }
})

hbs.registerHelper('userJoinRoom', function(options) {
    const { room, participants } = options.hash;

    if (room && participants && participants.some(participant => participant.room == room.id)) {
        return options.fn(this)
    } else {
        return options.inverse(this)
    }
})