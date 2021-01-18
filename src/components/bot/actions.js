'use strict'
const apis = require('../apis')
const cron = require('node-cron')
const config = require('./config')

exports.start = async (client) => {
  cron.schedule('*/10 * * * *', () => {
    sendMessage(client)
  })

}

async function sendMessage(client) {
  const news = await pullNews()
  const guildsConfigs = config.getGuildsConfigs()

  for (const key in news) {

    let channels = guildsConfigs
      .map(gc => gc.channels)
      .reduce((total, channels) => {
        total.push(...channels.filter(ch => ch.repositories.includes(key) || ch.repositories.includes('all')))
        return total
      }, [])

    for (let i = 0; i < channels.length; i++) {
      const channel = channels[i]
      const channelClient = client.channels.cache.get(channel.id)
      channelClient.send(messageFormat(news[key][2]))
    }
  }
}

function messageFormat(obj) {

  let message = `**${obj.title}**
${obj.description}

${obj.url}
`

  return message
}

async function pullNews() {
  let response = {}

  for (const key in apis) {
    response[key] = await apis[key].search()
  }

  return response
}
