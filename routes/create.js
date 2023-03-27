var express = require('express')
var router = express.Router();

//Importing the model
const User = require('./model/User');
const Question = require('./model/Question');
const Contest = require('./model/Contest');

//---------------------------------------
router.get('/', isLoggedIn, function(req, res){
    res.render('create');   //show already created
})


//Add desired number of questions, then club them to form a contest
router.post('/', isLoggedIn, async function(req, res){
    var loop = req.body.loop;
    var title = req.body.title;
    var creator = req.user;

    await Contest.create({title: title, creator: creator});

    for(let i=0; i<loop; i++){
        var tt = req.body.tt;
        var body = req.body.body;
        var flag = req.body.flag;

        Question.create({title: tt, body: body, flag: flag});

        const ct = await Contest.findOne({title: title, creator: creator});
        var qs = await Question.findOne({title: tt, body: body, flag: flag}); 
        ct.question.push(qs);

        ct.save();
    }
    res.render('contest');
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
        return next();
    res.redirect('/login');
}

module.exports = router;

