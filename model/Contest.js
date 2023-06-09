const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

// var User = require('./User');

var Contest = new Schema({
    title: {
        type: String,
        require: true
    },
    body:{
        type: String,
        require: true
    },
    creator: {
        type: Schema.Types.ObjectId, //Object of User
        ref: 'User'
    },
    activeTime:{
        type: Date,
        require: true
    },
    activeState: {
        type: String,
        require: true,
    },
    question: [{
        type: Schema.Types.ObjectId, //Object of Question
        ref: 'Question'
    }]
});

module.exports = mongoose.model('Contest', Contest);