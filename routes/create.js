var express = require('express')
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.json())
router.use(bodyParser.json({ type: 'application/*+json' }));
router.use(bodyParser.urlencoded({ extended: false }));

//Importing the model
const User = require('../model/User');
const Question = require('../model/Question');
const Contest = require('../model/Contest');

//---------------------------------------
router.get('/', isLoggedIn, function(req, res){
    res.render('create');   //show already created
})


//Add desired number of questions, then club them to form a contest
router.post('/', isLoggedIn, function(req, res){
    const loop = req.body.loop;

    const contests = new Contest({
        title: req.body.title,
        creator: req.body.creator,
    })
    
    for(let i=0; i<loop; i++){
        const ques = new Question({
            tt: req.body.title,
            body: req.body.body,
            flag: req.body.flag,
        })
        ques.save()
        .then((result)=>{
        console.log("Question created");
        }).catch((err)=>{
        console.log(err);
        });
 
        contests.question.push(ques);
    }
    
    contests.save()
    .then((result)=>{
    console.log("Contest created");
    }).catch((err)=>{
    console.log(err);
    });

    res.render('contest');
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
        return next();
    res.redirect('/login');
}

module.exports = router;

