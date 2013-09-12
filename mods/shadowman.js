var incipit  = [ "Come sempre...", "Mah...", "Sono amareggiato...", "Mi stavo chiedendo..." ];

var sommario = [
    {   text: "I videogiochi ormai fanno tutti schifo...",      topic: ["VI", "NI"]       },
    {   text: "Pure la nintendo si è data al casual...",        topic: ["VI", "NI"]       },
    {   text: "Ormai la Hasbro pensa solo ai soldi...",         topic: ["HA"]             },
    {   text: "Mi stavo rivedendo il video di farenz...",       topic: ["VI", "NI", "YO"] },
    {   text: "Ma tutti gli youtubers come yotobi...",          topic: ["YO"]             }
];

var corpo    = {
    "VI" : [
        "Ormai la ubisoft non ci tiene piu ai suoi fan",
        "Non frega piu a nessuno di fare bei giochi ma solo ai soldi",
        "Mi sono stufato del mondo videoludico",
        "Non ci sono piu giochi che mi piacciano",
        "Ma poi la vita che non ha piu avuto giochi?",
        "Farenz è davvero impazzito..."
    ],
    
    "NI" : [
        "Solo nintendo riusciva a fare bei giochi ed ora...",
        "Non uscirà mai un kid icarus 2",
        "Chissà se ci sarà un buon kirby per wii u"
    ],
    
    "HA" : [
        "Chissà se andranno oltre 65 episodi",
        "Che poi brutta la regola dei 65",
        "Chissà se la season 3 sarà migliore",
        "Mi chiedo se miglioreranno il doppiaggio italiano della seconda stagione",
        "Ora useranno il cartone solo per vendere giocattoli..."
    ],
    
    "YO" : [
        "Ma poi da yotobi non me l'aspettavo",
        "Ormai tutti lo fanno solo per soldi",
        "Han messo la pubblicità ovunque",
        "Poi ce zeb89 come si chiama"
    ]
};

var conclusione = {
    "VI" : [
        "Ho deciso che lascierò il mondo dei videogiochi",
        "Mah, credo che la smetterò di videogiocare",
        "non credo giocherò per molto tempo",
        "Mi tocca giocare ai classici",
        "Basta, mi do al retrogaming puro"
    ],
    
    "NI" : [
        "uff e io che speravo in nintendo",
        "pure nintendo alla fine mi ha deluso...",
        "mah, senza neanche nintendo che gioco a fare..."
    ],
    
    "HA" : [
        "Che peccato però eh",
        "peccato, mi piaceva questa serie",
        "mah, altra serie rovinata",
        "uff, mi tocca cercare un'altra bella serie ora"
    ],
    
    "YO" : [
        "credo che smetterò di seguire yotobi",
        "anche youtube ormai è andato a puttane",
        "che peccato mi piacevano i suoi video"
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
        
        if (text.substring(0, 10) === "!shadowman") {
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
    
    console.log("Shadowman93 Simulator is ready! [trigger: !shadowman]");
};