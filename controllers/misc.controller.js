const axios = require('axios');

module.exports.home = (req, res, next) => {
    axios.get("https://type.fit/api/quotes")
    .then((data) => {
        const randomNumber = Math.floor(Math.random()*(200-1+1)+1)
        const randomQuote = data.data[randomNumber]
        
        res.render('misc/home', { quote: randomQuote })
    })
    .catch(error => next(error));
    
}

module.exports.about = (req, res, next) => {
    res.render('misc/about');
}

module.exports.contact = (req, res, next) => {
    res.render('misc/contact');
}

