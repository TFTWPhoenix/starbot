// Requires
const botkit = require('../botkit/index');
const fs = require('fs');

// Version
let version = fs.readFileSync(".git/refs/heads/main").toString().substring(0,7);

// Load servers
let servers = fs.readdirSync("starbot/config/servers");
for(let i = 0; i < servers.length; i++) {
    addBot(require("./config/servers/" + servers[i]));
}


// Bot
function addBot(config) {
    let bot = botkit.createBot(config.host,config.port,config.connectAs);
    bot.on('ready',() => {
        bot.sendchat("&7Starbot has started. &8Version: OBR-" + version);
    })
    bot.on('text',(text) => {
        console.log(`[${config.host}:${config.port}/Chat] ${text}`);
    });
}