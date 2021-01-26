'use strict'
const config = require('./config')
const commands = require('./commands')
const log = require('../../utils/log')

exports.start = async (client) => {
  // on ready
  client.on('ready', async () => {
    log.info('Running!')
  })

  // when bot joined to server
  client.on('guildCreate', async (guild) => {
    config.createGuildConfig(guild.id)
    log.info(`Acabo de unirme a una guild! ${guild.id}`)
  })

  // when bot is kick from server
  client.on('guildDelete', async (guild) => {
    config.deleteGuildConfig(guild.id)
    log.info(`Acabo de ser expulsado a una guild ${guild.id}`)
  })

  // bot listening chat
  client.on('message', async (msg) => {
    let response = undefined

    if (msg.content.startsWith('$news')) {
      const args = getArguments(msg)
      response = await commands.command(args)
    }

    replyMessage(msg, response)
  })
}

function replyMessage(msg, response) {
  if (response === undefined) {
    return
  }

  msg.reply(response.message)
}

function getArguments(msg) {
  const author = {
    id: msg.author.id,
    username: msg.author.username
  }

  const guild = {
    id: msg.channel.guild.id,
    name: msg.channel.guild.name,
    ownerID: msg.channel.guild.ownerID
  }

  const channel = {
    id: msg.channel.id,
    name: msg.channel.name,
  }

  return {
    guild,
    channel,
    author,
    command: msg.content
  }
}
