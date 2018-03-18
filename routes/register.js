var express = require('express');
var router = express.Router();
var mysql  = require('mysql');
var session = require('express-session');



router.get('/register', function(req, res, next) {
  
    res.render('register');
});

router.post('/home', function(req, res) {
    var today = new Date();
    var users={
    "name":req.body.name,
    "password":req.body.password,
    "email":req.body.email,
    "city":req.body.city,
    "phone":req.body.phone
};
    console.log("data"+users)
   var connection = mysql.createConnection({
            host: 'localhost',
            user: 'sstromne_dsn',
            password: 'rxzD^JbW&SMC',
            database: 'sstromne_dsn'
        });
     connection.query('INSERT INTO register SET ?',users, function (error, results, fields) {
      if (error) {

            console.log(error)
      }else{
         
            console.log("success")
      }
      
    });
     session.userdata = users;
     console.log("userdata"+session.userdata);

     res.render('home.html',{user_info:session.userdata});
});

module.exports = router;
