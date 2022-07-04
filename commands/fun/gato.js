const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
	name: "gato",
	aliases: ["game", "tictactoe", "duelo"],
	category: "fun",
	description: "Desafia a un jugador a un epico duelo de gato",
	usage: "[command | alias]",
    run: async (bot) => {
        let {message} = bot;
        message.channel.send({
            content: `La curiosidad mato al gato <@${message.member.id}>`,
        });
        fs.readdirSync("./gatoImages/").forEach((file, i) => {
            const attachment = new Discord.MessageAttachment(`./gatoImages/cat${i+1}.jpg`);
            message.channel.send({files: [attachment]});
         });
    }
}