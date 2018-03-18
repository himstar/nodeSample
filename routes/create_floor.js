var express = require('express');
var router = express.Router();
var mysql  = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
            host: 'localhost',
            user: 'sstromne_dsn',
            password: 'rxzD^JbW&SMC',
            database: 'sstromne_dsn'
        });

router.get('/create_floor', function(req, res, next) {
    var userData = session.login_user;
     console.log("your data"+userData);
     var floordata = session.floor_data;
     console.log("floor data--"+floordata);
     var room_data = session.room_data;
  
    res.render('create_floor',{user_info:userData,floordata:floordata, room_data:room_data});
});

router.post('/create_floor', function(req, res, next) {
	 var today = new Date();
   console.log("login_date--"+today);
	 var floor={
    "user_id" : session._id,
    "floor_name":req.body.floor
   
};
connection.query('INSERT INTO floors SET ?', floor, function (error, results, fields) {
      if (error) {

            console.log(error);
      }else{
         
            console.log("Insert successfully");                 
      

            var query = "SELECT * FROM floors";
            connection.query(query, function (err, rows, fields) {
                    if (err) throw err;
                    console.log("your query--"+query);
                    var data = JSON.stringify(rows); 
                    session.floor_id = rows[0].id;
                    session.floor_data = rows;
                    console.log("floor_id----"+session.floor_id);
                    console.log("floor_data----"+ session.floor_data.floor_name);
                    res.redirect('create_floor');

                  
             });       
        
          }
   
    
  });
 
 
});


router.post('/create_room', function(req, res) {
	 var today = new Date();
	 var room={
    "floor_id" :session.floor_id,
    "room_name":req.body.room,
    "user_id" : session._id
    
   
};
connection.query('INSERT INTO rooms SET ?',room, function (error, results, fields) {
      if (error) {

            console.log(error)
      }else{
         
            console.log("success---"+room);
      }
if(results)
        {
            var query = "SELECT * FROM rooms WHERE room_name='" + req.body.room + "'";
            connection.query(query, function (err, rows, fields) {
                    if (err) throw err;
                    console.log("your query--"+query);
                     var data = JSON.stringify(rows); 
                    console.log("floordata"+data);
                    session.room_id = rows[0].id;
                    session.room_data = rows[0];
                    console.log("room_id----"+session.room_id);
                    console.log("room_data----"+session.room_data.room_name);
                   res.redirect('create_floor');
                  
             });       
        
        
    }
});


    
});
router.post('/create_device', function(req, res) {
   var today = new Date();
   var device={
    "room_id" : session.room_id,
    "device_name" :req.body.device,
    "floor_id":session.floor_id,
    "channel" :req.body.channel,
    "user_id" : session._id
    
   
};
connection.query('INSERT INTO devices SET ?',device, function (error, results, fields) {
      if (error) {

            console.log(error)
      }else{
         
            console.log("success---"+device);
      }
if(results)
        {
            var query = "SELECT * FROM devices WHERE device_name='" + req.body.device + "'";
            connection.query(query, function (err, rows, fields) {
                    if (err) throw err;
                    console.log("your query--"+query);
                     var data = JSON.stringify(rows); 
                    console.log("floordata"+data);
                    session.device_id = rows[0].id;
                    session.device_data = rows[0];
                    console.log("device_id----"+session.device_id);
                    console.log("device_data----"+session.device_data.device_name);
                   res.redirect('home');
                  
             });    
        
        
    }
});


    
});

module.exports = router;
