'use strict'

exports.start = (client) => {
  // on ready
  client.on('ready', () => {
    console.log('running!')
  })

  // when bot joined to server
  client.on('guildCreate', (guild) => {
    console.log('acabo de unirme a una guild!')
    console.log(guild.id)
    console.log('acabo de unirme a una guild!')
  })

  // when bot is kick from server
  client.on('guildDelete', (guild) => {
    console.log('acabo de ser expulsado de una guild!')
    console.log(guild.id)
    console.log('acabo de ser expulsado de una guild!')
  })

  // bot listening chat
  client.on('message', (msg) => {
    if (msg.content.startsWith('$news')) {
      // magia
    }
  })
}
