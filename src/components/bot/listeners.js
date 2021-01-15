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
    await config.createGuildConfig(guild.id)
    console.log('acabo de unirme a una guild!'.includes)
  })

  // when bot is kick from server
  client.on('guildDelete', async (guild) => {
    console.log('acabo de ser expulsado de una guild!')
    console.log(guild.id)
    await config.deleteGuildConfig(guild.id)
    console.log('acabo de ser expulsado de una guild!')
  })

  // bot listening chat
  client.on('message', async (msg) => {
    let response = undefined

    if (msg.content.startsWith('$news')) {
      response = await commands.command(msg.content)
    }

    if (response === undefined) {
      return
    }

    msg.reply(response)
  })
}
