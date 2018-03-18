var express = require('express');
var router = express.Router();
var mysql  = require('mysql');
var session = require('express-session');
 
router.get('/temp_control', function(req, res, next) {
	var userData = session.login_user;
     console.log("your data"+userData);
  
    res.render('temp_control.html',{user_info:userData});
});

module.exports = router;