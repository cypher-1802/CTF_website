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

//Contest Page
router.get('/(:id)', async function(req,res){
    try{
        var user = req.user;

        const question = await Question.find();
        Contest.findById(req.params.id)
        .then(qss=>{
            if(!qss){
                res.status(404).send({message: "Contest not found"});
            }else{
                console.log(qss.question);
                res.render('question', {QuestionID: qss.question, Question: question, User: user});
            }
        }).catch(err=>{
            res.status(500).send({message: err.message});
        })
    }catch(error){
        res.status(400).json({message: error.message});
    }
});

router.get('/contest/(:id)', async function(req,res){
    try{
        var user = req.user;

        Question.findById(req.params.id)
        .then(qss=>{
            if(!qss){
                res.status(404).send({message: "Question not found"});
            }else{
                res.render('qpage', {Question: qss, User: user});
            }
        }).catch(err=>{
            res.status(500).send({message: err.message});
        })
    }catch(error){
        res.status(400).json({message: error.message});
    }
});

router.post('/submit', function(req, res){
    try{
        Question.findById(req.body.id)
        .then(Ques=>{
            if(!Ques){
                res.status(404).json({message: "Question ID not found"});
            }else{
                if(req.body.flag === Ques.flag){
                    //Update users scores
                    res.render('success', {id: req.body.id, message: "Flag is correct!"});
                }else{
                    res.render('success', {id: req.body.id, message: "Flag is incorrect!"});
                }
            }
        })
    }catch(error){
        res.status(400).json({message: error.message});
    }
})

//Sorting the contests may be added

function isLoggedIn(req, res, next){
    if(!req.isAuthenticated())
        res.redirect('/authentication/login');
}

module.exports = router;