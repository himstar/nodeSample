var express = require('express');
var router = express.Router();
var mysql  = require('mysql');
var session = require('express-session');


var connection = mysql.createConnection({
            host: 'localhost',
            user: 'sstromne_dsn',
            password: 'rxzD^JbW&SMC',
            database: 'sstromne_dsn'
        }); 
router.get('/edit_floor', function(req, res, next) {
	var userData = session.login_user;
     console.log("your data"+userData);
     var floordata = session.floor_data;
      var room_data = session.room_data;
  
    res.render('edit_floor.html',{user_info:userData, floordata:floordata,room_data:room_data});
});


module.exports = router;