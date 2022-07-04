const dotenv = require("dotenv");
dotenv.config()

const guildId = process.env.GUILD_ID;

module.exports = {
	name: "ready",
	func: runAll,
};
function runAll(bot) {
	login(bot);
}
async function login(bot){
    const {client} = bot;
    console.log(`   Bot ${client.user.tag} iniciado correctamente! `);
}