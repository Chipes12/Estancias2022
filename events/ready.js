module.exports = {
	name: "ready",
	func: runAll,
};
function runAll(bot) {
	login(bot);
}
function login(bot){
    const {client} = bot;
    console.log(`   Bot ${client.user.tag} iniciado correctamente! `);
}