const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
	name: "help",
	aliases: ["h", "ayuda", "gelp"],
	category: "info",
	description: "Regresa la información de todos los comandos o la de un comando en especifico",
	usage: "[command | alias]",
	run: async (bot) => {
		let {client, message, args, prefix} = bot;
		const categorias = fs.readdirSync("./commands");
		if(args[0]) {
			const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
			const categoria = categorias.find(cat => cat.toLowerCase().endsWith(args[0].toLowerCase()));
			if(cmd){
				let embed = new Discord.MessageEmbed()
				.setTitle(`Comando: \`${cmd.name}\``)
				.setColor('DARK_NAVY');
				const cat = categorias.find(cat => cat.toLowerCase() == cmd.category);
				embed.addField('📂 Categoria: ', `\` ${cat} \``);
				if(cmd.description) embed.addField('📖 Descripción:', `\` ${cmd.description}\``);
				if(cmd.aliases && cmd.aliases.length > 0) embed.addField('✨ Alias: ',  `${cmd.aliases.map(alias => `\`${alias}\``).join(", ")}`);
				return message.reply({embeds: [embed]});
			} else if (categoria){
				const comandos_categoria =fs.readdirSync(`./commands/${categoria}`).filter(archivo => archivo.endsWith("js"));
				let embed = new Discord.MessageEmbed()
				.setTitle(`Comandos: 🌟\` ${categoria}\`🌟`)
				.setDescription(comandos_categoria.length > 0 ? `>>> *${comandos_categoria.map(comando => `\` ${comando.replace(/.js/, "")}\``).join(" - ")}*` : ">>> Todavia no hay comandos de este tipo")
				.setColor('DARK_NAVY');
				return message.reply({embeds: [embed]});
			} else {
				return message.reply(`❌ El comando ingresado no existe ❌\nUsa  \`${prefix}help\` para ver los comandos disponibles`);
			}
		} else {
			let embed = new Discord.MessageEmbed()
			.setTitle(`Lista de comandos de ${client.user.tag}`)
			.setThumbnail("https://upload.wikimedia.org/wikipedia/commons/c/c8/Iteso_logo.jpg")
			.setFooter(`Para más información sobre un comando o categoria puedes utilizar \`${prefix}consulta\``)
			.setColor('DARK_NAVY');

			categorias.forEach(category => {
				embed.addField(`Categoria: `, `${category} 💬`);
				const comandos_categoria =fs.readdirSync(`./commands/${category}`).filter(archivo => archivo.endsWith("js"));
				embed.addField("Comandos: " ,`>>> *${comandos_categoria.map(comando => `\` ${comando.replace(/.js/, "")}\``).join(" - ")}*`);
			});
			return message.reply({embeds: [embed]});
		}
	},
};