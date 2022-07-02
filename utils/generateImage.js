const Canvas = require("canvas");
const Discord = require("discord.js");
const dotenv = require('dotenv');
dotenv.config();
const backImage = process.env.IMAGE;

const dim = {
    height: 500,
    width: 1008,
    margin: 50
};

const avatar = {
    size: 256,
    x: 380,
    y: 125
};

const generateImage = async (member) => {
    let username = member.user.username;
    let discriminator = member.user.discriminator;
    let avatarURL = member.user.displayAvatarURL({format: "png", dynamic: false, size: avatar.size});

    const canvas = Canvas.createCanvas(dim.width, dim.height);
    const ctx = canvas.getContext("2d");

    // draw in the background
    const backimg = await Canvas.loadImage(backImage);
    ctx.drawImage(backimg, 0, 0);

    // draw black tinted box
    ctx.fillStyle = "rgba(0,0,0,0.8)";
    ctx.fillRect(dim.margin, dim.margin, dim.width - 2 * dim.margin, dim.height - 2 * dim.margin);

    const avatarImg = await Canvas.loadImage(avatarURL);
    ctx.save();
    
    ctx.beginPath();
    ctx.arc(avatar.x + avatar.size / 2, avatar.y + avatar.size / 2, avatar.size / 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(avatarImg, avatar.x, avatar.y);
    ctx.restore();

    // write in text
    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    // draw in Welcome
    ctx.font = "40px serif";
    ctx.fillText("Bienvenid@ a las estancias de Verano 2022!", dim.width/2, dim.margin + 50);

    // draw in the username
    ctx.font = "50px serif";
    ctx.fillText(username + "#" +  discriminator, dim.width/2, dim.height - dim.margin - 20);

    // draw in to the server

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png");
    return attachment;
}

module.exports = generateImage;