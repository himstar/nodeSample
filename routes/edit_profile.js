var express = require('express');
var router = express.Router();
var session = require('express-session');
var connection=require('./../config/database');
var mysql=require('mysql');
var fs = require("fs");

/* GET users listing. */
var connection = mysql.createConnection({
            host: 'localhost',
            user: 'sstromne_dsn',
            password: 'rxzD^JbW&SMC',
            database: 'sstromne_dsn'
        });
router.get('/edit_profile', function(req, res) {
     var userData = session.login_user;
     console.log("your data"+userData);
   
    res.render('edit_profile.html',{user_info:userData});
});
router.post('/home', function(req, res) {
	connection.connect(function (err) {
           // console.log(data);
            if (!err) {

            var query = "UPDATE register SET  name='" + req.body.name + "', email = '"+req.body.email+"', phone='"+req.body.phone+"' where id = "+session._id;
            connection.query(query, function (err, result) {
   			if (err) throw err;
   			console.log("your query--"+result.affectedRows);
        console.log("your query--"+query);
        var updatedata = JSON.stringify(result);
    		console.log(result.affectedRows + " record(s) updated");
        console.log("updatedData"+updatedata);
        if(result.affectedRows)
        {
            var query = "SELECT * FROM register WHERE id=" +session._id;
            connection.query(query, function (err, rows, fields) {
                    if (err) throw err;
                    console.log("your query--"+query);
                     var data = JSON.stringify(rows); 
                    console.log("newdata"+data);
                    res.render('home.html',{user_info:rows[0]});
             });       
        
        
    }
  		});

        }

        });

   
    
});


module.exports = router;
