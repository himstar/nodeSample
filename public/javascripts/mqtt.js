var express = require('express');
var router = express.Router();
var mysql  = require('mysql');
var mqtt = require("mqtt");
var session = require('express-session');
var client= mqtt.connect("tcp://192.168.1.16:1883", {username: "root", password: "admin@123" });
var userData = session.login_user;
var deviceData  = session.device_data;
var MQTT_TOPIC = "homeGet/light";

io.on('connection',function(socket) {
    console.log('hello');
    var userData = session.login_user;
    var deviceData  = session.device_data;

    //FAN
    socket.on('ONFAN', function(onfan,stat)
    {
        console.log("this is the status of the button", stat);
        var commandName = {
                    "clientEmail" : userData.email,
                    "clientID" : userData.id,
                    
                }
                commandName = JSON.stringify(commandName);
            client.publish("status","json",commandName);
            console.log(" with command--"+commandName);
        

        if(stat==true)
        {
            console.log(onfan);
            client.subscribe(onfan,{qos:2});
            // console.log('abfter subscribe'+fan);
            client.publish(onfan,'ON ');
            console.log("the fan is: ON");

        }

        else if(stat==false){
            console.log("");
            client.publish(onfan,'OFF')
            console.log("the fan is OFF");
        } 
    });

    //LIGHT

    socket.on('ONLIGHT',function (onlight, stat)
    {
        console.log("this is the staus of the button", stat);

        if(stat==true)
        {
            console.log(onlight);
            client.subscribe(onlight,{qos:2});
            client.publish(onlight,'ON');
            console.log("the light is: ON");

        }
        else if(stat==false){
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
