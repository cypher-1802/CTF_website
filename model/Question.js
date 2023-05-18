const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

// var User = require('./User');

var Question = new Schema({
    // contest: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Contest',
    // },
    title: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    flag: {
        type: String,
        require: true
    },
    score: {
        type: Number,
    }
});

module.exports = mongoose.model('Question', Question);