const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const EMAIL_PATTERN = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required',
        minlength: [5, 'Name has to have at least 5 characters']
    },
    email: {
        type: String,
        required: 'Email is required',
        unique: true,
        match: [EMAIL_PATTERN, 'Please use a valid email']
    },
    password: {
        type: String,
        required: 'Password is required',
        match: [PASSWORD_PATTERN, 'Password needs a minimum of 8 characters with at least one letter and one number']
    },
    googleID: {
        type: String
    },
    image: {
        type: String,
        default: ""
    },
    active: {
        type: Boolean,
        default: false
    },
    activationToken: {
        type: String,
        default: () => {
          return Math.random().toString(36).substring(7) +
            Math.random().toString(36).substring(7) +
            Math.random().toString(36).substring(7) +
            Math.random().toString(36).substring(7)
        }
    },
    role: {
        type: [ String ],
        enum: [ god, master, moderator, regular ]
    }
})