const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const EMAIL_PATTERN = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const SALT = 10;

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
        enum: [ "god", "master", "moderator", "regular" ]
    }
}, { timestamps: true });

userSchema.virtual('likes', {
    ref: 'Like',
    localField: '_id',
    foreignField: 'user',
    justOne: false
});

userSchema.pre('save', function(next) {
    const user = this;

    if(user.isModified('password')){
        bcrypt.hash(user.password, SALT)
            .then(hash => {
                user.password = hash;
                next();
            })
            .catch(error => next(error));
    } else {
        next();
    }
});

userSchema.methods.checkPassword = function(password){
    const user = this;
    
    return bcrypt.compare('password', user.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;