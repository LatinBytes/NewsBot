'use strict'
const errorHandler = require('./src/utils/error')
const config = require('./config.json')
const Discord = require('discord.js')

// handler error
process.on('uncaughtException', errorHandler.fatalErrorHandler)
process.on('unhandledRejection', errorHandler.fatalErrorHandler)

// login with the bot
const client = new Discord.Client()
client.login(config.BOT_TOKEN)

const start = require('./src/components/bot').start
start(client)
