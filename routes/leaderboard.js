var express = require('express')
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.json())
router.use(bodyParser.json({ type: 'application/*+json' }));
router.use(bodyParser.urlencoded({ extended: false }));

//Importing the model
const User = require('../model/User');

//---------------------------------------

module.exports = router;