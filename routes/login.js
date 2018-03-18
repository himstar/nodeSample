/**
 * Created by Pragya and Ajit on 6/23/2017.
 */
//var authenticateController=require('./controller/authenticate-controller');
//var registerController=require('./controller/register-controller');
var express = require('express');
var router = express.Router();
var session = require('express-session');
var connection=require('./../config/database');
var mysql=require('mysql');
/* GET users listing. */
var connection = mysql.createConnection({
            host: 'localhost',
            user: 'sstromne_dsn',
            password: 'rxzD^JbW&SMC',
            database: 'sstromne_dsn'
        });
router.get('/', function(req, res, next) {
    
    res.render('login');
});
router.post('/', function(req, res, next) {
	var today = new Date();
	console.log("login_date--"+today);
	var data = JSON.stringify({
	"name": ""+req.body.name,
	"password": ""+req.body.password
});
    console.log("Verfiying data ...'\n"+data);
	connection.connect(function (err) {
           // console.log(data);
            if (!err) {

                 var query = "SELECT * FROM register WHERE name='" + req.body.name + "' and password = '" + req.body.password + "'";
                connection.query(query, function (err, rows, fields) {
                    if (err) throw err;
                    console.log("your query--"+query);
                     var data = JSON.stringify(rows); 
                    console.log("userdata"+data);
                        if(rows.length >0){
                        if (req.body.password==rows[0].password && req.body.name==rows[0].name) {
                       res.redirect('home');
                       console.log('welcome');
                    session._id=rows[0].id;
                    session.login_user = rows[0];
                    console.log("login_user_id--"+session._id);
                    res.end();
                    }
                      }
                     else {
                        res.render('login',{message: 'The email address or password you entered is incorrect.Try again with correct credentials'});
                        res.end();
                        
                      // io.set('session', data.username);
                     
                    }
              

                });

            }
        });
    });
router.get('/logout',function(req, res){
      session.login_user = null;
      console.log("your data--"+session.login_user)
    res.redirect('/');

});







/*
 router.post('/DATA', function(req, res,next){
 var username=req.body.username;
 var password=req.body.password;
 console.log("hkfjm");
 connection.query('insert into register VALUES?',username,password,function(err,result){
 console.log("hkfj");
 if(err){
 console.log('error');
 }
 else
 {
 console.log('noerror')
 }
 })

 });

 */
module.exports = router;
