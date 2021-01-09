'use strict'
const {client} = require('../Cliente');


let bot = ()=>
    client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag} AKA BAD MOTHER-FUCKER!`)
})

module.exports = {bot}; 