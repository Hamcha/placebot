var fs = require('fs');

var logfolder = "logs/";
var currentlog = [];

exports.init = function(client){
    client.on("message",function(nick, to, text, message){
        currentlog.push({ nick : nick, message : text });
    });
    
    setInterval(function(){
        var data = JSON.stringify(currentlog);
        
        var date = new Date();
        var timestamp = date.getDay() + "_" + date.getMonth() + "_" + date.getYear() + "." 
                        + date.getHours() + "_" + date.getMinutes() + "_" + date.getSeconds();
        
        fs.writeFile(logfolder+timestamp+".log",data,function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("/LOGMAN/ Hourly Log saved! ["+date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()+"]");
                currentlog = [];
            }
        }); 
    },3600000);
    
    console.log("/LOGMAN/ has started loggin'!");
};