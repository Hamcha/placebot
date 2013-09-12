var incipit  = [ "Ma guarda..", "Senti, jacopo.." ];

var sommario = [
    {   text: "Il problema non è che non mi piaci", topic: ["BF"] },
    {   text: "Guarda, uscire con te non sarebbe un problema..", topic: ["BF"] },
    {   text: "Credo finalmente di aver trovato un punto in comune", topic: ["VI"] }
];

var corpo    = {
    "BF" : [
        "È che ho già il ragazzo..",
        "È solo che non sono così disperata da volere un secchione come ragazzo.",
        "È che ogni tanto vorrei uscire, non giocare a Dota.",
        "È che cerco gente con esperienza..",
        "È che proprio mi fai ribrezzo!",
        "È che secondo me non mi meriti..",
        "Ma guarda, non sei il mio tipo.."
    ],

    "VI" : [
        "Anche a me piacciono i videogiochi!"
    ]
};

var conclusione = {
    "BF" : [
        "Quindi capisci, non posso!",
        "Spero tu capisca.",
        "Possiamo rimanere solo amici? Magari neanche quello."
    ],

    "VI" : [
        "Però solo i simulatori di treni",
        "Però non quelle cagate che giochi te",
        "Però a me piacciono quelli dove non si muore",
        "Ma solo quelli su facebook! Mi clicchi la mucca?"
    ]
};

function end(client, to, topic, conclusione) {
    'use strict';
    var phrase = conclusione[topic][Math.floor(Math.random() * conclusione[topic].length)];
    client.say(to, phrase);
}

function saybody(client, to, topic, possible, count, conclusione) {
    'use strict';
    if (count === 0) {
        end(client, to, topic, conclusione);
        return;
    }
    
    var phrase = possible[Math.floor(Math.random() * possible.length)];
    client.say(to, phrase);
    
    if (possible.lenght === undefined) count = 1;
    else possible.splice(phrase);
    
    setTimeout(function () {
        saybody(client, to, topic, possible, count - 1, conclusione);
    }, 2000);
}

exports.init = function (client) {
    'use strict';
    
    client.on("message", function (nick, to, text, message) {
        
        if (text === "!compagna") {
            var rand_start = incipit[Math.floor(Math.random() * incipit.length)];
            client.say(to, rand_start);
            setTimeout(function () {
                var summary = sommario[Math.floor(Math.random() * sommario.length)];
                var topic = summary.topic[Math.floor(Math.random() * summary.topic.length)];
                client.say(to, summary.text);
                var count = Math.floor(Math.random() * 2) + 1;
                setTimeout(function () {
                    saybody(client, to, topic, corpo[topic], count, conclusione);
                }, 2000);
            }, 2000);
        }
    });
    
    console.log("Compagnadicorso Simulator is ready! [trigger: !compagna]");
};