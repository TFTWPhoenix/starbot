// Requires
const botkit = require('../botkit/index');
const fs = require('fs');

// Load servers
let servers = fs.readdirSync("starbot/config/servers");
for(let i = 0; i < servers.length; i++) {
    addBot(require("./config/servers/" + servers[i]));
}


// Bot
function addBot(config) {
    let bot = botkit.createBot(config.host,config.port,config.connectAs);
    bot.on('ready',() => {
        bot.sendchat("&7Starbot has started. &8(OBR-1.0)")
    })
}