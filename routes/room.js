var express = require('express');
var router = express.Router();
var mysql  = require('mysql');
var session = require('express-session');
 
router.get('/room', function(req, res, next) {
	var userData = session.login_user;
     console.log("your data"+userData);
  
    res.render('room.html',{user_info:userData});
});

module.exports = router;