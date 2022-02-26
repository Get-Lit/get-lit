module.exports.home = (req, res, next) => {
    res.render('misc/home');
}

module.exports.about = (req, res, next) => {
    res.render('misc/about');
}

module.exports.contact = (req, res, next) => {
    res.render('misc/contact');
}