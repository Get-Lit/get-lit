const mongoose = require('mongoose');
const { resolveHostname } = require('nodemailer/lib/shared');
const Room = require('../models/room.model');

module.exports.list = (req, res, next) => {
    Room.find()
        .then(rooms => {
            res.render('rooms/list', { rooms });
        })
        .catch(error => next(error));
};

module.exports.detail = (req, res, next) => {
    Room.findById(req.params.id)
        .then(room => {
            res.render('rooms/detail', { room })
        })
        .catch(error => next(error));
};