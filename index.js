'use strict'
require('dotenv').config()
const log = require('./src/utils/log')
const Discord = require('discord.js')

// handler error
process.on('uncaughtException', log.fatalErrorHandler)
process.on('unhandledRejection', log.fatalErrorHandler)

// login with the bot
const client = new Discord.Client()
client.login(process.env.BOT_TOKEN)

const start = require('./src/components/bot').start
start(client)
