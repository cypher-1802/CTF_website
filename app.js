const express = require('express');
const mongoose = require('mongoose');
var passport = require('passport');
// var session = require('express-session');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local').Strategy;
require('dotenv').config({path:'./.env'})
// var passportLocalMongoose = require('passport-local-mongoose');

//Importing the model
var User = require('./model/User');

//Importing the routes
const authentication = require('./routes/authentication');
    contest = require('./routes/contest');
    leaderboard = require('./routes/leaderboard');
    profile = require('./routes/profile');
    question = require('./routes/question');
    create = require('./routes/create');
    createQues = require('./routes/createQues');

// //Objects for express
const app = express();
app.use(express.json())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

// mongoose.connect("mongodb://localhost/27017");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('express-session')({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false,
    // cookie: {secure: true}
}));

app.use(passport.initialize());
app.use(passport.session());

//Using routes
app.use('/authentication', authentication);
app.use('/create', create);
app.use('/contest', contest);
app.use('/question', question);
app.use('/leaderboard', leaderboard);
app.use('/profile', profile);
app.use('/createQues', createQues);

app.use(express.static(__dirname + '/views'));

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
passport.serializeUser(function(user, done){
    done(null, user);
});
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});
// passport.use(new LocalStrategy(User.authenticate()));

//-------------------------------------------------
//ROUTES
//-------------------------------------------------

//Home Page
app.get('/', function(req, res){
    // res.status(400).json({message: "HEYYY!"});
    res.render("login");
});

// app.get('/', isLoggedIn, function(req,res){
//     user = req.user.get('username');
//     // res.status(400).json({message:"HEY"});
//     res.render('index', {user: 'user'});
// })

// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated())
//         return next();
//     res.redirect('/login');
// }

// MONGO DB-SERVER CONNECTION
const port = process.env.PORT||4000;
const databaseConnection = require('./database/connect')
databaseConnection.then(()=>{
    app.listen(port, ()=>{
        console.log("Server running in http://localhost:"+port);
    });
}).catch((error)=>{
    console.log("Problem connecting to database.\n"+error.message);
});
