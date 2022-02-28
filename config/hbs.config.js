const hbs = require('hbs');

hbs.registerPartials('./views/partials');

hbs.registerHelper('userLikedBook', function(options) {
    const { books, likes } = options.hash;

    if (books && likes && likes.some(like => like.book == book.id)) {
        return options.fn(this)
    } else {
        return options.inverse(this)
    }
})