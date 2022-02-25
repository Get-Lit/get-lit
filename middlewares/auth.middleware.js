module.exports.isAuthenticated = (req, res, next) => {
    if(req.user){
        // res.locals.currentUser = req.user;
        next();
    } else {
        res.redirect('/login');
    }
};

module.exports.isNotAuthenticated = (req, res, next) => {
    if(!req.user){
        next();
    } else {
        res.redirect('/profile');
    }
};