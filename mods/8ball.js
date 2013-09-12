var replies = [
    "Direi di sì...", "Nah.jpg",
    "Ne dubitavi?"  , "Ahahahahah no.",
    "Che domande, Certo!", "Ma neanche lontanamente!",
    "Ma spero veramente di no!", "Ci puoi giurare!"
];

exports.init = function(client){
    
    client.on("message",function(nick, to, text, message){
        if (text.substring(0,10) == "secondo te")
        {
            var rand = replies[Math.floor(Math.random() * replies.length)];
            client.say(to,rand);
        }
    });
    
    console.log("8ball loaded! [trigger: secondo te]");
};