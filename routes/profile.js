var express = require('express')
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.json())
router.use(bodyParser.json({ type: 'application/*+json' }));
router.use(bodyParser.urlencoded({ extended: false }));

//Importing the model
const User = require('../model/User');
var multer = require('multer');

// router.use(multer({dest: '../uploads/', rename: function(fieldname, filename){
//     return filename;
// },
// }));

//---------------------------------------
//Get user detail page
// router.get('/', isLoggedIn, function(req, res){
router.get('/', function(req, res){
    var user = req.user;

    res.render('profile', {user: 'user'});
});

//Update the bio
router.put('/bio', isLoggedIn, function(req, res){
    var user = req.user;
    var id = req.user.get('id');
    User.findByIdAndUpdate(id, {bio: req.body.bio}, function(err, data){
        if(err){
            req.flash('error', 'Bio update unsuccessful!');
            res.render('profile', {user: 'user'});
        }else{
            req.flash('success', 'Bio update successful!');
            res.render('profile', {user: 'user'});
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
        return next();
    res.redirect('/login');
}

module.exports = router;