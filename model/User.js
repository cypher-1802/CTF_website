const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 4,
        maxlength: 16,
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    bio: {
        type: String,
    },
    date_joined: {
        type: Date,
        default: Date.now,
    },
    photo: {
        data: Buffer,
        type: String,
    },
    email: {
        type: String,
        required: true,
        validate: [
            {validator: validators.notEmpty, msg: 'Email is empty'},
            {validator: validators.isEmail, msg: 'Invalid email'}
        ]
    },
    password: {
        type: String,
        minlength: 8,
    },
    contests_played: {  //Updates whenever player plays the game
        contestID: {type: Schema.Types.ObjectId, ref: 'Contest'},
        score: Number,
        date: Date.now,
    }, 
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User)