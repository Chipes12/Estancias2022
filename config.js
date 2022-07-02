const dotenv = require("dotenv");
dotenv.config();

const token = process.env.TOKEN;
const owner1 = process.env.OWNER_ID;

module.exports = {
    bot_admin: [owner1],
    token,
    prefix: "iteso!",
}