var incipit  = [ "Uffa..", "Come sempre...", "Mah...", "Sono amareggiato...", "Mi stavo chiedendo..." ];

var sommario = [
    {   text: "I videogiochi ormai fanno tutti schifo...",      topic: ["VI", "NI", "IN"] },
    {   text: "La PS4 intanto non ha giochi...",                topic: ["VI", "NI", "IN"] },
    {   text: "Pure la nintendo si è data al casual...",        topic: ["VI", "NI", "IN"] },
    {   text: "Mi stavo rivedendo il video di farenz...",       topic: ["VI", "NI", "IN"] },
    {   text: "Ho fatto davvero bene a lasciare questo fandom", topic: ["FN"] },
    {   text: "Ma come abbiamo fatto a ridurci così?",          topic: ["FN","VI"] },
    {   text: "Ma che razza di fandom siamo diventato?",        topic: ["FN"] },
    {   text: "Leggendo il forum non ho parole..",              topic: ["FN"] }
];

var corpo    = {
    "VI" : [
        "Ormai la ubisoft non ci tiene piu ai suoi fan",
        "Non frega piu a nessuno di fare bei giochi ma solo ai soldi",
        "Mi sono stufato del mondo videoludico",
        "Non ci sono piu giochi che mi piacciano",
        "Ma poi la vita che non ha piu avuto giochi?",
        "Farenz è davvero impazzito...",
        "Ma poi alla Sony che gli passa per la testa.."
    ],

    "IN" : [
        "Proprio non accetto che gli indie fanno parte del mercato...",
        "Ma poi sta cosa degli indie proprio non mi va giu.."
    ],
    
    "NI" : [
        "Solo nintendo riusciva a fare bei giochi ed ora...",
        "Non uscirà mai un kid icarus 2",
        "Chissà se ci sarà un buon kirby per wii u",
        "Ma poi col 2DS ma che gli salta per la testa?!",
        "Nintendo poi ora ci prova coi bambini col 2DS.."
    ],

    "FN" : [
        "Ormai di brony non se ne salva nessuno",
        "Che poi ormai EG è passato..",
        "Ma poi quelli di Double Rainboom son davvero fuori..",
        "Con quelli che dicono che Magic Duel è fanservice",
        "Con questo odio verso Rainbow Dash per la S3..",
        "Che i brony vedono problemi ovunque..",
        "Cosa non va bene in Twilight alicorno?",
        "Non posso perdere tempo a leggere la gente che si lamenta sul forum.."
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

    "IN" : [
        "Mi toccherà smettere di giocare",
        "Spero che Nintendo non smetta di fare giochi"
    ],
    
    "NI" : [
        "uff e io che speravo in nintendo",
        "pure nintendo alla fine mi ha deluso...",
        "mah, senza neanche Nintendo che gioco a fare..."
    ],

    "FN" : [
        "Mah, che fandom del cavolo",
        "Mi darò al furry",
        "Chissà come sarà la S4",
        "Vabeh, tanto DHN mi basterà",
        "Mi spiace dirlo ma è così"
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
        var msg = text.split(" ");
        var subject = null;
        if (msg.length < 1) return;
        if (msg[0] === "!blackknight") {
            if (msg.length > 1 && msg[1] in corpo) subject = msg[1];
            var rand_start = incipit[Math.floor(Math.random() * incipit.length)];
            client.say(to, rand_start);
            setTimeout(function () {
                var summary = sommario[Math.floor(Math.random() * sommario.length)];
                var topic = summary.topic[Math.floor(Math.random() * summary.topic.length)];
                if (subject != null) topic = subject;
                client.say(to, summary.text);
                var count = Math.floor(Math.random() * 2) + 1;
                setTimeout(function () {
                    saybody(client, to, topic, corpo[topic], count, conclusione);
                }, 2000);
            }, 2000);
        }
    });
    
    console.log("TheBlackKnight Simulator is ready! [trigger: !blackknight]");
};