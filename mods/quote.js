var fs = require('fs');

var quotes = [];

exports.init = function(client)
{
    fs.readFile('quotes.txt', function (err, data) {
      if (err) throw err;
      quotes = JSON.parse(data);
    });
    
    client.on("message",function(nick, to, text, message){
        var msg = text.split(" ");
        if (msg[0] == "!quote")
        {
            var n;
            if (msg.length > 1 )
            {
                n = parseInt(msg[1]);
                if (isNaN(n)){ client.say(to,"fak u "+nick); return; }
            }
            else n = Math.floor(Math.random() * quotes.length);
            
            if (quotes.length-1 < n)
            {
                client.say(to,":Quote: Quote inesistente!");
                return;
            }
            
            client.say(to,":Quote #"+n.toString()+": "+quotes[n].toString());
            return;
        }
        
        if (msg[0] == "!addquote")
        {
            var message = text.replace(/^!addquote /,"");
            quotes.push(message);
            var data = JSON.stringify(quotes);

            fs.writeFile("quotes.txt",data,function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("`Quotes! New Quote Added!");
                    client.say(to,"Added Quote #"+(quotes.length-1).toString());
                }
            });
        }
    });
    
    console.log("`Quotes! loaded");
};