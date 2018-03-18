var express = require('express');
var router = express.Router();
var mysql  = require('mysql');
var session = require('express-session');


var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '12345',
            database: 'switch_app'
        });
 
router.get('/forget', function(req, res, next) {
	

  res.render('create_password');

    
});




module.exports = router;