const { readdirSync } = require("fs"); 
let buildMsg = "";

module.exports = async (client, reload) => {
    buildMsg = "";
	readdirSync("./commands/").forEach((dir) => {
		//Obtención de todos los comandos dentro de las categorias
		const commands = readdirSync(`./commands/${dir}/`).filter((f) => f.endsWith(".js"));
		for (let file of commands) {
			if (reload) delete require.cache[require.resolve(`../commands/${dir}/${file}`)];
			let pull = require(`../commands/${dir}/${file}`); 

			//Registro del comando extraido en la coleccion de comandos
			if (pull.name) {
				client.commands.set(pull.name, pull); 
			} else {
				buildMsg+= `${file}\n`;
				continue;
			}
			//Si tiene algun alias lo añade a la colección igualmente
			if (pull.aliases)
				pull.aliases.forEach((alias) => {
					client.aliases.set(alias, pull.name);
				});
		}
	});
    if (buildMsg.length == 0) console.log("Commands: Build Success");
    else console.log("Errors:\n" + buildMsg);
};
