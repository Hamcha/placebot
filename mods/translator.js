var MsTranslator = require('mstranslator');

var mstran = new MsTranslator({client_id:"GET_YOUR_OWN_USER", client_secret: "GET_YOUR_OWN_KEY"});

exports.init = function(client){
    mstran.initialize_token(function(keys){ 
      client.on("message",function(nick, to, text, message){
            var msg = text.split(" ");
            if (msg[0] == "!traduci")
            {
                if (msg.length < 4)
                {
                    client.say(to,"fak u "+nick); return;
                }
                
                var params = { 
                  text: text.replace(msg[0]+" "+msg[1]+" "+msg[2]+" ",""), 
                  from: msg[1],
                  to: msg[2]
                };
                                
                mstran.translate(params, function(err, data) {
                    client.say(to,nick+": "+data);
                });
            }
       });
    
      console.log("-MSTranslate- Token Acquired! [TOKEN: !traduci]");
      
    });
    
    console.log("-MSTranslate- Acquiring token.. ");
    
};