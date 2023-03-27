var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local');
// var passportLocalMongoose = require('passport-local-mongoose');

//Importing the model
var User = require('./model/User');

//Importing the routes
var auth = require('./routes/authentication');
    challenge = require('./routes/contest');
    leaderboard = require('./routes/leaderboard');
    profile = require('./routes/profile');
    question = require('./routes/question');

//Objects for express
var app = express();

mongoose.connect("mongodb://localhost/27017");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//Using routes
app.use('/auth', auth);
app.use('/create', create);
app.use('/contest', contest);
app.use('/:id', question);
app.use('/leaderboard', leaderboard);
app.use('/profile', profile);

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//-------------------------------------------------
//ROUTES
//-------------------------------------------------

//Home Page
app.get('/', function(req, res){
    res.render("index");
});

app.get('/', isLoggedIn, function(req, err,){
    user = req.user.get('username');
    res.render('index', {user: 'user'});
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
        return next();
    res.redirect('/login');
}

var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Server has started!");
});