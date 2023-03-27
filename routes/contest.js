var express = require('express')
var router = express.Router();

//Importing the model
const User = require('./model/User');
const Contest = require('./model/Contest');

//---------------------------------------
router.get('/', isLoggedIn, async function(req, res){
    try{
        var user = req.user;
        var contest = await Contest.find();
        res.render('contest', {contest: 'contest', user: 'user'});
    }catch(error){
        res.status(400).json({message: error.message});
    }
    res.render('contest');
});

//Sorting the contests may be added

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
        return next();
    res.redirect('/login');
}

module.exports = router;