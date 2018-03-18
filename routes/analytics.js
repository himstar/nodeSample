var express = require('express');
var router = express.Router();
var mysql  = require('mysql');
var session = require('express-session');
 
router.get('/analytics', function(req, res, next) {
	var userData = session.login_user;
     console.log("your data"+userData);
  
    res.render('analytics.html',{user_info:userData});
});

module.exports = router;