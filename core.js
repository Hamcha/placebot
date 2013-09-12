// Import libs
var irc = require("irc");
var fs = require('fs');

// Config values

var server = "irc.ponychat.net";
var nickname = "flotrshi";
var realname = "flotrshi is best butt";
var autojoin = [ "#brony.it", "#testbass" ];

console.log(".. Welcome to Placebot! ..\n");
console.log(".. Connecting to " + server + " ..\n");

// Create IRC client
var client = new irc.Client(server, nickname, { 
    channels: autojoin, realName: realname, userName: nickname
}).on("error",function(e){console.log(e);});
console.log(".. Loading mods ..\n");

// Loading custom modules

var mods = {};

fs.readdir("mods", function(err, files){
    for (f in files)
    {
        var modname = files[f].replace(".js","");
        mods.modname = require("./mods/"+modname);
        mods.modname.init(client);
    }
    
    console.log("\n.. All done, have fun! ..\n");
});

// You can hack it now!
