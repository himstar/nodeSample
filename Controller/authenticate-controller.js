/**
 * Created by Pragya on 6/20/2017.
 */
var connection = require('./../config/database');
module.exports.login=function(req,res){
    var username=req.body.name;
    var password=req.body.password;
    connection.query('select* from register WHERE username= ?',[username], function (error, results, fields) {
        if (error) {
            res.json({
                status:false,
                message:'there are some error with query'

            })

        }else{
            if(results.length >0){
                bcrypt.compare(password, results[0].password, function(err, ress) {
                    if(!ress){
                        res.json({
                            status:false,
                            message:"Email and password does not match"
                        });
                    }else{
                        res.json({
                            status:true,
                            message:"Successfully Login"
                        })
                    }
                });
            }
            else{
                res.json({
                    status:false,
                    message:"Email does not exits"
                });
            }
        }
    });
}
