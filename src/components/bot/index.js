'use strict'
const events = require('./events')
const actions = require('./actions')

exports.start = (client) => {
  events.start(client)
  actions.start(client)
}
