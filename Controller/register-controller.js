/**
 * Created by Pragya on 6/20/2017.
 */
//var connection = require('../config/database');

exports.register = function(req,res){
    console.log('hiii db');
    console.log("req",req.body);
    var today = new Date();
    var log={
        "username":req.body.username,
        "password":req.body.password,
        "email":req.body.email,

    }
    connection.query('insert into resister VALUES ?',log, function (error, results, fields) {
        if (error) {
            console.log("error ocurred",error);
            res.send({
                "code":400,
                "failed":"error ocurred"
            })
        }else{
            console.log('The solution is: ', results);
            res.send({
                "code":200,
                "success":"user registered sucessfully"
            });
        }
    });
}