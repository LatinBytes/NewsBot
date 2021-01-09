'use strict'
const files = require('./../../utils/files')
const path = require('path')

const configPath = `${process.cwd()}/config`

exports.createGuildConfig = async (idGuild) => {
  const filePath = path.join(configPath, `${idGuild}.json`)
  await files.saveFile(filePath, JSON.stringify({ idGuild }))
  console.log(`cree el file de ${idGuild}`)
}

exports.deleteGuildConfig = async (idGuild) => {
  const filePath = path.join(configPath, `${idGuild}.json`)
  await files.deleteFile(filePath)
  console.log(`elimine el file de ${idGuild}`)
}
