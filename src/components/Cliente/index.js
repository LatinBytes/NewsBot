const config = require('../../../config.json')
const Discord = require('discord.js')
const client = new Discord.Client()
client.login(config.BOT_TOKEN)
module.exports = {client};