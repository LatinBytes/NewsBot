'use strict'
const config = require('./config')

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
    console.log('acabo de unirme a una guild!')
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
    if (msg.content.startsWith('$news')) {
      // magia
    }
  })
}
