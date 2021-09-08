// Imports
const mc = require('minecraft-protocol');
const EventEmitter = require('events').EventEmitter;

function createBot(host,port,username) {

    let bot = new EventEmitter; // Create the bot object.
    
    bot._protocol = mc.createClient({host:host,port:port,username:username}); // Add the Minecraft thing to it.

    // Add fields to the bot object.
    bot.host = host;
    bot.port = port;
    bot.username = username;

    // Events aaaaaaa

    // Emit ready:
    bot._protocol.on('state',(newstate) => {
        if(newstate === mc.states.PLAY) {
            bot.emit('ready');
        }
    })

    // Chat event...
    bot._protocol.on('chat',(message) => {
        // Ignore messages from all 0's UUIDs.
        if(message.sender === "00000000-0000-0000-0000-000000000000") return;
        
        // Parse goes brr...

        ///////////////////////////////////////////////////////////////////////////////////////
        // We don't speak about this mess
        let text = "";
        for(let i = 0; i < message.message.split(",").length; i++) {
            let segment = message.message.split(",")[i];
            if(segment.startsWith("\"text\":\"") || segment.startsWith("{\"text\":\"")) {
                text += segment.split("\"text\":\"")[1].split("\"")[0];
            }
        }
        console.log(text);
        ////////////////////////////////////////////////////////////////////////////////////////
    })

}

module.exports = { createBot };