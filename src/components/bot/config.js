'use strict'
const files = require('./../../utils/files')
const path = require('path')

const configPath = `${process.cwd()}/config`

exports.createGuildConfig = (idGuild) => {
  const filePath = path.join(configPath, `${idGuild}.json`)

  let config = {
    guild: {
      id: idGuild
    }
  }

  files.saveFile(filePath, JSON.stringify(config, null, 4))

  console.log(`----- Cree el file de la guild ${idGuild} -----`)
}

exports.saveGuildConfig = (idGuild, content) => {
  const filePath = path.join(configPath, `${idGuild}.json`)

  files.saveFile(filePath, JSON.stringify(content, null, 4))

  console.log(`----- Actualice el file de la guild ${idGuild} -----`)
}

exports.deleteGuildConfig = (idGuild) => {
  const filePath = path.join(configPath, `${idGuild}.json`)

  files.deleteFile(filePath)

  console.log(`----- Elimine el file de la guild ${idGuild} -----`)
}
