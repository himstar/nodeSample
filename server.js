var express = require('express');
var path = require('path');
var mysql=require('mysql');
var config=require('./config/database');
var favicon = require('serve-favicon');
var router=require('router');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var login = require('./routes/login');
var register = require('./routes/register');
var users = require('./routes/users');
var mqtt = require("mqtt");
var session = require('express-session');
var edit_profile = require('./routes/edit_profile');
var create_floor = require('./routes/create_floor');
var edit_floor = require('./routes/edit_floor');
var home = require('./routes/home');
var settings = require('./routes/settings');
var room = require('./routes/room');
var temp_control = require('./routes/temp_control');
var analytics = require('./routes/analytics');
var scheduling = require('./routes/scheduling');
var forgot = require('./routes/forgot_password');
var create = require('./routes/create_password');
var fileUpload = require('express-fileupload');


//var session=require('sessionManagement');
//var http      =     require('http').Server(app);
//var app     = express();
//var server  = require('http').createServer(app);
//var io      = require('socket.io')(http);
 
var app = express();
var server = app.listen(2000);
var io = require('socket.io').listen(server);
var userData = session.login_user;
var deviceData  = session.device_data;
var client= mqtt.connect("tcp://114.30.73.150:1883", {username: "root", password: "admin@123" });
var device_name=session.device_data;
var allFloordata= session.one_floor_data;





  //  var http = require('http');
//make sure you keep this order
//var app = express();
//var server = http.createServer(app);
//var io = require('socket.io').listen(server);
//console.log('server connected');
//var register=require('register');
io.on('connection',function(socket) {
    console.log('mqtt_connected......');
   

    //FAN
    socket.on('ONFAN', function(onfan,state)
    {
        console.log("this is the staus of the button", state);
        allFloordata= session.one_floor_data;
        userData = session.login_user;

        if(state==true)
        {
            
            // console.log('abfter subscribe'+fan);
            client.publish(onfan,'ON ');
            console.log("the fan is: ON");

        }

        else if(state==false){
            var payload = {
                    clientEmail : userData.email,
                    clientID : userData.id,
                    channel_no: allFloordata.channel
                    
                }
            commandName = JSON.stringify(payload);
            client.publish("status","json",commandName);
            console.log(" with payload--"+commandName);
            console.log(onfan);
            client.subscribe(onfan,{qos:2});
            client.publish(onfan,JSON.stringify(payload), { qos: 2 });
            console.log("the fan is OFF");
        } 
    });

//LIGHT

    socket.on('ONLIGHT',function (onlight, state)
    {
        console.log("this is the staus of the button", state);
        device_name=session.device_data;
        userData = session.login_user;
        deviceData  = session.device_data;

        if(state==true)
        {
            console.log(onlight);
            client.subscribe(onlight,{qos:2});
            client.publish(onlight,'ON');
            console.log("the light is: ON");

        }
        else if(state==false){
             var payload = {
                    "clientEmail" : userData.email,
                    "clientID" : userData.id,
                   
                }
            commandName = JSON.stringify(payload);
            client.publish("status","json",commandName);
            console.log(" with payload--"+commandName);

            console.log("");
            console.log("the light is off");
            client.publish(onlight,"OFF");
        }
    });

    socket.on('bedslide', function(bed, slidetpk){

        if(bed!=null){
            client.subscribe(slidetpk);

            client.publish(slidetpk, "the slider value is " + bed);
            console.log("The slider value is ", bed);
        }
    });

    socket.on('redirect', function (data) {
        console.log('hey');
        app.get('/', function (req, res) {
            res.redirect('register.html');
        })
    });

       socket.on('login', function (data) {
        var today = new Date();
        //console.log('user is connected');
        console.log("login_date--"+today);
        debugger;
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '12345',
            database: 'switch_app'
        });
        connection.connect(function (err) {
           // console.log(data);
            if (!err) {

                var query = "SELECT  * FROM register";
                connection.query(query, function (err, rows, fields) {
                    //console.log("this--"+query);
                    console.log(rows);
                   // console.log(query);
                    // console.log('login session');
                    if (err) throw err;
                    if (rows==null) {
                        console.log('wrong pswd');
                       io.emit('login', {message: 'Wrong login or password', session: ""});
                    } else {
                         io.emit('home.html', {message: 'success', session: data.username});
                        console.log('welcome');
                      // io.set('session', data.username);
                     
                    }


                });

            }
        });
    });


   /* socket.on('register', function (data) {
        var today = new Date();
    var users={
        "name":data.username,
        //"email":req.body.email,
        "password":data.password,
        "email":data.email,
        "city":data.city,
        "phone":data.phone
          }
          console.log("data"+users)
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '12345',
        database : 'switch_app'
    });
    connection.connect(function(err) {

            var query = connection.query('insert into register set ?', users, function (error, results, fields) {
                //console.log('gf');
                if (results==null) {d
                    socket.emit('success', {message: 'Data Not Inserted', session: ""});
                } else {
                  //  socket.set('session', data.username);
                   // socket.emit('success', {message: 'Data Inserted', session: data.username});
                    console.log(results);
                    socket.emit('success', {message: 'Data Inserted'});
                }
            });
    });
});
*/

 socket.on('save', function (data) {
        console.log('user is connected');
        debugger;
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '12345',
            database: 'switch_app'
        });
        connection.connect(function (err) {

             app.post('/floor',function(req,res){
    console.log(req.body);

     var floor={floorname:req.data.floorname}

    connection.query('insert into floor SET ?',floor,function(err,res){
    if(err){
        throw err;
    }
        else{
        console.log(res);

    }


        });
   res.send(JSON.stringify(req.body));

           // console.log(data);
            /*if (!err) {

                var query = "SELECT * FROM register WHERE username='" + data.username + "' and email = '" + data.email + "'";
                connection.query(query, function (err, rows, fields) {
                   // console.log(query);
                    // console.log('login session');
                    if (err) throw err;
                    if (rows.length == 0) {
                        console.log('wrong pswd');
                       //io.emit('login', {message: 'Wrong login or password', session: ""});
                    } else {
                        //location.href = "home.html";
                        console.log('welcome');
                      // io.set('session', data.username);
                      // io.emit('login', {message: 'success', session: data.username});
                    }*/


                });
  
        
    });
 });

socket.on('edit', function (data) {
        //console.log('user is connected');
        debugger;
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '12345',
            database: 'switch_app'
        });
        connection.connect(function (err) {
           // console.log(data);
            if (!err) {

                var query = "UPDATE table_name SET name = req.body.name, email = data.email,phone=data.phone WHERE id= data.id";
                 connection.query(query, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });
            }
        });
    });



});



// views engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));
app.use('/api', router);
app.use(express.static(path.join(__dirname, 'views')));
app.use(session({
    secret: "config.sessionSecret",
    saveUninitialized: true,
                 resave: true
}));
app.use(fileUpload());
//app.post('/config/register',config.database.register);
//app.use('/', index);
app.use(function(req, res, next){
    if((((req.path!='/')&&(req.path!='/register')&&(req.path!='/forget') )&&(req.path!='/change_password') )&& session.login_user == null) {
       res.redirect('/');
    }
  else
    next();
});


app.use('/users', users);
app.use('/',login);
app.get('/logout',edit_floor);
app.post('/login',login);
app.post('/home',register);
app.get('/register',register);
app.get('/edit_profile',edit_profile);
app.post('/home',edit_profile);
app.get('/create_floor',create_floor);
app.post('/create_floor',create_floor);
app.get('/edit_floor',edit_floor);
app.post('/create_room',create_floor);
app.post('/create_device',create_floor);
app.get('/home',home);
app.get('/settings',settings);
app.get('/room',room);
app.get('/temp_control',temp_control);
app.get('/analytics',analytics);
app.get('/scheduling',scheduling);
app.get('/forget',forgot);
app.post('/change_password',create);
app.get('/change_password',create);
app.post('/upload',home);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
//server.listen(2000);
//app.listen(2000);
console.log('server is running');
module.exports = app;
