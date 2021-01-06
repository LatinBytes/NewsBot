'use strict'
const {bot} = require('./src/components/bot/index')
//const apis = require('./src/apis/')

const errorHandler = require('./src/utils/error')

const {mensaje} = require('./src/components/bot/message')

process.on('uncaughtException', errorHandler.fatalErrorHandler)
process.on('unhandledRejection', errorHandler.fatalErrorHandler)

bot();
mensaje("la tuya");
