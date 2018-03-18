
var mysql      = require('mysql');
var connection = mysql.createConnection({
            host: 'localhost',
            user: 'sstromne_dsn',
            password: 'rxzD^JbW&SMC',
            database: 'sstromne_dsn'
        });
connection.connect(function(err){
    if(err) {
        console.log("Database is connected");
    } else {
        console.log("Error while connecting with database");
    }
});

module.exports = connection;