const mongoose = require('mongoose')
const books = require('../data/books.json')
const rooms = require('../data/rooms.json')
const Book = require('../models/book.model')
const Room = require('../models/room.model')


require('../config/db.config')

mongoose.connection.once('open', () => {
    console.log(`Connected to the database ${mongoose.connection.db.databaseName}!`)

    mongoose.connection.db
        .dropDatabase()
            .then(() => console.log('Database dropped.'))
            .then(() => {
                books.forEach(book => {
                    new Book({
                        ...book,                
                    })
                    .save() 
                    .then((book) => console.log(book))                   
                });
                rooms.forEach(room => {
                    Room.create(room)
                        .then(room => console.log(room.name))
                        .catch(error => console.error(error));
                });
            })
            .catch(err => console.error('mongoose', err))
});
