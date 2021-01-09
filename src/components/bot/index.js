'use strict'
const listeners = require('./listeners')
const actions = require('./actions')

exports.start = async (client) => {
  listeners.start(client)
  actions.start(client)
}
