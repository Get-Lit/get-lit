module.exports.isAdmin = (req, res, next) => {
    console.log("hola")
    if(req.user.role === "admin") {
        console.log("hola")
        next();
    } else {
        res.render('error')
    }
}

