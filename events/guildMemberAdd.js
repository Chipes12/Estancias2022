const generateImage = require("../utils/generateImage");
const WelcomeChannelID = process.env.CHANNEL_ID;

module.exports = {
    name: "guildMemberAdd",
    func: async (bot, member) => {
        const img = await generateImage(member);
        member.guild.channels.cache.get(WelcomeChannelID).send({
            content: `<@${member.id}> Bienvenid@ a las estancias de Verano 2022!`,
            files: [img]
        });
    }
}