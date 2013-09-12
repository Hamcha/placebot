var actionsM = [
    "Puppami", "Degustami", "Lucidami", "Manipolami", "Disidratami", "Irritami", "Martorizzami", 
    "Lustrami", "Osannami", "Sorseggiami", "Assaporami", "Apostrofami", "Spremimi", "Dimenami",
    "Agitami", "Stimolami", "Suonami", "Strimpellami", "Stuzzicami"
];

var objectsM = [
    "il birillo", "il bastone", "l'ombrello", "il malloppo", "il manico", "il manganello",
    "il ferro", "la mazza", "l'archibugio", "il timone", "l'arpione", "il flauto", "la reliquia",
    "il fiorino", "lo scettro", "il campanile", "la proboscide", "il pino", "il maritozzo", "il perno",
    "il tubo da 100", "la verga", "il precipuzio", "il pendolo", "la torre di Pisa", "la lancia"
];
/*
var actionsF = [
    "Perforami", "Abbattimi"
];

var objectsF = [
    "la aiuola", "la mercanzia", "la pentola", "la scodella", "la gondola", "la gabbia",
    "lo sfiatatoio", "l'altare", "l'abisso", "la caverna", "la palude", "il giardino", "la lumaca",
    "la lasagna"
];
*/

exports.init = function(client){
    
    client.on("message",function(nick, to, text, message){
        if (text === "!metafora")
        {
            var actions = actionsM;
            var objects = objectsM;
            var rand = actions[Math.floor(Math.random() * actions.length)] + " " + objects[Math.floor(Math.random() * objects.length)];
            client.say(to,rand);
        }
    });
    
    console.log("Metafore randomiche loaded! [trigger: !metafora]");
};