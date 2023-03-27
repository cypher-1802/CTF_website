var express = require('express')
var router = express.Router();

//Importing the model
const User = require('./model/User');

//---------------------------------------
//Register Form
router.get('/register', function(req, res){
    res.render('register');
});

//User Registration
router.post('/register', async (req, res)=>{
    const user = await User.create({
        username: req.body.username,
        fname: req.body.fname,
        lname: req.body.lname,
        bio: req.body.bio,
        email: req.body.email,
        password: req.body.password,
    });

    return res.render('index');
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
                res.render('index');
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
        res.redirect('/');
    });
});

// //Get all registered users
// router.get('/users', async function(req, res){
//     try{
//         const data = await User.find();
//         res.json(data);
//     }catch(error){
//         res.status(400).json({message: error.message});
//     }
// });

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
        return next();
    res.redirect('/login');
}

module.exports = router;