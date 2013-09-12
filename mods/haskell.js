var request = require('request');
var urltemp = "http://tryhaskell.org/haskell.json?method=eval&expr=";
var loadtemp = "http://tryhaskell.org/haskell.json?method=load&contents=";
var j = request.jar();
request = request.defaults({jar:j});

exports.init = function(client){
    client.on("message",function(nick, to, text, message){
        msgs = text.trim().split(" ");
        command = msgs.splice(0,1);
        if (command != "hs") return;
        myurl = urltemp;
        if (msgs[0] == "load")
        {
            myurl = loadtemp;
            loader = msgs.splice(0,1);
        }
        cmdline = msgs.join(" ");
        request.get(myurl+encodeURIComponent(cmdline), function (error, res, body) {
            res = JSON.parse(body);
            if (res.error)
            {
                err = res.error.replace(/\n|\r|\r\n/ig," ");
                err = err.length > 200 ? err + "..." : err
                client.say(to, err); 
                return;
            }
            if (res.success)
            {
                client.say(to, res.success);
                return; 
            }
            resultLimited = res.result.length > 200 ? res.result.substr(0,200) + "..." : res.result
            client.say(to, resultLimited);
        });
    });
    
    console.log("Haskellbot loaded!");
};