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
 
router.get('/home', function(req, res, next) {
	var userData = session.login_user;
  var Images = session.userImage;

  
      var query = "SELECT d.id,d.room_id,d.device_name,d.floor_id,d.channel,d.user_id,r.id,r.floor_id,r.room_name,r.user_id,f.id,f.user_id,f.floor_name FROM floors f INNER JOIN devices d ON f.user_id=d.user_id INNER JOIN rooms r ON r.user_id=d.user_id where d.user_id='"+ session._id +"' and f.user_id='"+ session._id +"' and d.user_id='"+ session._id +"'";

            connection.query(query, function (err, rows, fields) {
                    if (err) throw err;
                    console.log("your query--"+query);
                    var data = JSON.stringify(rows); 
                    session.floor_id = rows[0].id;
                    session.allfloor_data = rows;
                    session.one_floor_data =rows[0];
                    console.log("floor_id----"+session.floor_id);
                    console.log("allfloor_data----"+data);

                });       

    res.render('home',{user_info:userData, floordata:session.allfloor_data, user_image:Images});

});



router.post('/upload', function(req, res) {

 var file = req.files.image;
 var img_name=file.name;

 var userId = session._id;
 var asd = file.name;
 
    if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                 
              file.mv('public/uploads/'+file.name, function(err) {
                             
               if (err)
 
                 return res.status(500).send(err);
       var sql = "INSERT INTO User_image(file_name,user_id,img) VALUES('"+ asd +"','" + userId + "','" + img_name + "')";
        console.log("hii--"+sql);
     var query = connection.query(sql, function(err, result) {
         if (err){
            console.log(err);
        }
        else{
            console.log("hii--"+result);
        }
     
     });

      });
    }
var query = "SELECT * FROM User_image where user_id = "+session._id+" order by img_id desc";
                connection.query(query, function (err, rows, fields) {
                    if (err) throw err;
                    console.log("your query--"+query);
                     var data = JSON.stringify(rows); 
                    console.log("userdata"+data);                     
              session.userImage = rows[0];
               console.log("image_data----"+session.userImage.file_name);

                });
                
res.redirect('home');
});

module.exports = router;