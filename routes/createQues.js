var express = require('express');
var bodyParser = require('body-parser');
const Question = require('../model/Question');
var router = express.Router();

router.use(bodyParser.json())
router.use(bodyParser.json({ type: 'application/*+json' }));
router.use(bodyParser.urlencoded({ extended: false }));

//Importing the model
const User = require('../model/User');

//---------------------------------------
router.post('/', function (req, res) {
    console.log(req.body);
    console.log("reached here");
    const ques = new Question({
        title: req.body.title,
        body: req.body.body,
        flag: req.body.flag,
    });

    console.log(ques);
    res.send(ques);
});

module.exports = router;