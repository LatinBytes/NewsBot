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
  const guildsConfigs = await config.getGuildsConfigs()

  for (const key in news) {

    let channels = guildsConfigs
      .filter(gc => gc.hasOwnProperty('channels'))
      .map(gc => gc.channels)
      .reduce((total, channel) => {
        total.push(...channel.filter(ch => ch.repositories.includes(key) || ch.repositories.includes('all')))
        return total
      }, [])

    for (const channel of channels) {
      const channelClient = client.channels.cache.get(channel.id)
      channelClient.send(messageFormat(news[key][0]))
    }
  }
}

function messageFormat(obj) {
  return obj.url
}

async function pullNews() {
  let response = {}

  for (const key in apis) {
    response[key] = await apis[key].search()
  }

  return response
}
