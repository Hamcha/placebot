var net = require("net");

var passkey = "yourpasswordhere";
var currentclient;

exports.init = function(client)
{
    var s = net.createServer(function (socket){
        socket.authenticated = false;
        currentclient = client;
        socket.on("data", function(data){
            onData(socket,data);
        });
    });
    
    s.listen(8987);
    
    console.log("- SECRET CONSOLE - live 'n kickin' at port 8987!");
};

function onData(socket,data) 
{
    data = data.toString().replace(/\r\n|\n|\r/,"");
    
    if (!socket.authenticated)
    {
        if (data == passkey) welcome(socket);
        else socket.end();
        
        return;
    }
    
    var cmddata = data.split(" ",1);
    
    switch (cmddata[0].toLowerCase())
    {
case "raw":
        var message = data.replace(/^raw /,"");
        currentclient.send(message);
        socket.write(":: " + message+"\n");
        break;

default:
        socket.write("Command not recognized!");
    }
    
    socket.write("\n> ");
    
}

function welcome(socket)
{
    socket.authenticated = true;
    socket.write("Hello, welcome to Secret Console!\n\n> ");
}