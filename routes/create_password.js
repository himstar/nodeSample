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
router.get('/change_password', function(req, res, next) {
  
  
    res.render('create_password');
});

router.post('/change_password', function(req, res) {
    var userEmail= req.body.email;
                connection.connect(function (err) {
           // console.log(data);
            if (!err) {

            var query = "UPDATE register SET  password='" + req.body.password + "' where email = '"+req.body.email+"'";
            connection.query(query, function (err, result) {
            if (err) throw err;
            console.log("your query--"+result.affectedRows);
        console.log("your query--"+query);
        var updatedata = JSON.stringify(result);
            console.log(result.affectedRows + " record(s) updated");
        console.log("updatedData"+updatedata);
        
       
        });

       

        }

           
       }); 

   
    res.render('login');
});


module.exports = router;