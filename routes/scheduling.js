var express = require('express');
var router = express.Router();
var mysql  = require('mysql');
var session = require('express-session');
var schedule = require('node-schedule');
 
router.get('/scheduling', function(req, res, next) {

var rule = new schedule.RecurrenceRule();

rule.minute = new schedule.Range(0, 59, 5);

schedule.scheduleJob(rule, function(){
    console.log(rule);
    console.log('Today is recognized by Rebecca Black!---------------------------');
    var userData = session.login_user;
    res.render('scheduling',{user_info:userData})
});


	;


    
});

module.exports = router;