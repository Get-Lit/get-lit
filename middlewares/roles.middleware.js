module.exports.isAdmin = (req, res, next) => {
    if(req.user.role === "admin") {
        next();
    } else {
        res.render('error')
    }
}

