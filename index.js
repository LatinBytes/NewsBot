'use strict'
const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')

const apis = require('./src/apis/')
const errorHandler = require('./src/utils/error')

process.on('uncaughtException', errorHandler.fatalErrorHandler)
process.on('unhandledRejection', errorHandler.fatalErrorHandler)

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong')
  }
})

client.login(config.BOT_TOKEN)

apis.gnews.search().then(data => console.log(data))