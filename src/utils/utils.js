'use strict'

exports.trim = (string) => {
  return string.replace(/\s\s+|\n/g, '')
}

exports.split = (string) => {
  return string.split(/[ ,]+/)
}

exports.clearDiscordID = (id) => {
  return id.replace(/\D/g, '')
}

exports.arrayToStringList = (arr) => {
  let response = ''

  arr.forEach(item => {
    response = response + `\t- ${item}\n`
  })

  return response
}
