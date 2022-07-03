const Discord = require("discord.js");

module.exports = {
	name: "amongus",
	aliases: ["sus", "amogus"],
	category: "fun",
	description: "Envia un among us aleatorio",
	usage: "[command | alias]",
    run: async (bot) => {
        let {message} = bot;
        let num = Math.trunc(Math.random() * (25) + 1);
        message.channel.send({
            content: `<@${message.member.id}> tu among us`,
            files: [{attachment: `./amongus/Crewmate${num}.png`}]
        });
    }
};