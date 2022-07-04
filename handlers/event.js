const fs = require("fs");
module.exports = (client, reload, bot) => {
	fs.readdir("./events/", (err, files) => {
		if (err) console.error(err);
		let jsfiles = files.filter((f) => f.split(".").pop() === "js");
		if (jsfiles.length <= 0) return console.log("There are no events to load");
		if (!reload) console.log(`Loading ${jsfiles.length} events...`);
		jsfiles.forEach((f, i) => {
			if (reload) delete require.cache[require.resolve(`../events/${f}`)];
			let pull = require(`../events/${f}`);
			client.events.set(pull.name, pull);
			if (!reload) console.log(`${i + 1}: ${f} loaded!`);
		});
	});
	if (!reload) initEvents(client, bot);
};

//Eventos bot
function initEvents(client, bot) {
	client.on("messageCreate", (message) => {
		if (!message.guild) return;
		try {
			client.events.get("messageCreate").func(bot, message);
		} catch (err) {
			console.error(err);
		}
    });

    client.on("ready", ()=>{
        try {
			client.events.get("ready").func(bot);
		} catch (err) {
			console.error(err);
		}
	});

	client.on("guildMemberAdd", (member) => {
		try {
			client.events.get("guildMemberAdd").func(bot, member);
		} catch (err) {
			console.log(err);
		}
	});
}