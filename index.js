const Discord = require("discord.js");

const client = new Discord.Client({ 
    disableMentions: "everyone",
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS",
        "GUILD_PRESENCES",
        "GUILD_VOICE_STATES"
    ]
}); 
const config = require("./config.js");
const { prefix, token } = require("./config.js");
const fs = require("fs");

let bot = {client, config, prefix};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();
client.functions = new Discord.Collection();
client.categories = fs.readdirSync("./commands/");

client.loadCmds = (client, reload) => require(`./handlers/command`)(client, reload);
client.loadEvents = (client, reload) => require("./handlers/event.js")(client, reload, bot);
client.loadFunctions = (client, reload) => require(`./handlers/function`)(client, reload);
client.loadFunctions(client, false);
client.loadCmds(client, false);
client.loadEvents(client, false);

module.exports = bot;
client.login(token);