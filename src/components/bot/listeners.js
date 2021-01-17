'use strict'
const config = require('./config')
const commands = require('./commands')

exports.start = async (client) => {
  // on ready
  client.on('ready', async () => {
    console.log('running!')
  })

  // when bot joined to server
  client.on('guildCreate', async (guild) => {
    console.log('acabo de unirme a una guild!')
    console.log(guild.id)
    config.createGuildConfig(guild.id)
    console.log('acabo de unirme a una guild!')
  })

  // when bot is kick from server
  client.on('guildDelete', async (guild) => {
    console.log('acabo de ser expulsado de una guild!')
    console.log(guild.id)
    config.deleteGuildConfig(guild.id)
    console.log('acabo de ser expulsado de una guild!')
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
