var express = require('express')
var bodyParser = require('body-parser');
var router = express.Router();
router.use(bodyParser.json())
router.use(bodyParser.json({ type: 'application/*+json' }));
router.use(bodyParser.urlencoded({ extended: false }));

//Importing the model
const User = require('../model/User');
const Contest = require('../model/Contest');
const Question = require('../model/Question');

//---------------------------------------
// router.get('/(:id)', isLoggedIn, async function(req, res){
router.get('/(:id)', async function(req,res){
    try{
        var user = req.user;
        var qss = await Question.find();

        Contest.findById(req.params.id)
        .then(contest=>{
            if(!contest){
                res.status(404).send({message: "Contest not found"});
            }else{
                console.log(user);
                console.log(contest);
                res.render('contest', {Contest: contest, Question: qss, User: user});
            }
        }).catch(err=>{
            res.status(500).send({message: err.message});
        })
    }catch(error){
        res.status(400).json({message: error.message});
    }
    // res.render('contest');
});

//Using query parameter ?status=ongoing
router.get('/', async function(req, res){
    try{
        var ct = await Contest.find({activeState: req.query.status||"ongoing"});//|active
        var Cuser = await User.find();

        if(!ct){
            res.status(404).send({message: 'No contest found'});
        }else{
            res.render('home', {Contest: ct, stat: req.query.status, User: Cuser});
        }

    }catch(error){
        res.status(400).json({message: error.message});
    }
});

//Sorting the contests may be added

function isLoggedIn(req, res, next){
    if(!req.isAuthenticated())
        res.redirect('/authentication/login');
}

module.exports = router;