var express = require('express')
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json())
router.use(bodyParser.json({ type: 'application/*+json' }));
router.use(bodyParser.urlencoded({ extended: false }));


//Importing the models
const User = require('../model/User');
const Question = require('../model/Question');
const Contest = require('../model/Contest');

//---------------------------------------
//Register Form
router.get('/register', function(req, res){
    res.render('register');
});

//User Registration
router.post('/register', async (req, res)=>{
    const user = new User({
        username: req.body.username,
        fname: req.body.fname,
        lname: req.body.lname,
        // bio: req.body.bio,
        email: req.body.email,
        password: req.body.password
    });

    user.save()
    .then((result)=>{
        console.log("User created");
    }).catch((err)=>{
        console.log(err);
    });

    //Displaying Contests
    try{
        const contest = await Contest.find();
        const Cuser = await User.find();
        res.render('home', {User: Cuser, contestData: contest});
    }catch(error){
        res.status(400).json({message: error.message});
    }
});

//Login Form
router.get('/login', function(req, res){
    res.render('login');
});


//User Login
router.post('/login', async function(req, res){
    try{
        const user = await User.findOne({username: req.body.username});
        if(user){
            const result = req.body.password === user.password;

            if(result){
                try{
                    const contest = await Contest.find();
                    const Cuser = await User.find();
                    res.render('home', {User: Cuser, contestData: contest});
                }catch(error){
                    res.status(400).json({message: error.message});
                }
            }else{
                res.status(400).json({error: "Password doesnt match"});
            }
        }else{
            res.status(400).json({error: "User doesn't exist"});
        }
}catch(error){
    res.status(400).json({error});
    }
});

//User logout
router.get('/logout', function(req, res){
    req.logout(function(err){
        if(err){
            return next(err);
        }
        res.render('index');
    });
});

//Get all registered users
router.get('/users', async function(req, res){
    try{
        const data = await User.find();
        res.json(data);
    }catch(error){
        res.status(400).json({message: error.message});
    }
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
        return next();
    res.redirect('/login');
}

module.exports = router;