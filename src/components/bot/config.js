'use strict'
const files = require('./../../utils/files')
const path = require('path')
const log = require('../../utils/log')

const configPath = `${process.cwd()}/config`

exports.createGuildConfig = async (idGuild) => {
  const filePath = path.join(configPath, `${idGuild}.json`)

  let config = {
    guild: {
      id: idGuild
    }
  }

  await files.saveFile(filePath, JSON.stringify(config, null, 4))

  log.info(`Cree el config file de la guild:${idGuild}`)
}

exports.getGuildsConfigs = async () => {
  const filesNames = await files.getFilesDirectory(configPath)

  const response = []

  for (let i = 0; i < filesNames.length; i++) {
    const fileName = filesNames[i]

    if (fileName.includes('example-id')) {
      continue
    }

    const filePath = path.join(configPath, fileName)
    response.push(require(filePath))
  }

  return response
}

exports.saveGuildConfig = async (idGuild, content) => {
  const filePath = path.join(configPath, `${idGuild}.json`)

  await files.saveFile(filePath, JSON.stringify(content, null, 4))

  log.info(`Actualice el config file de la guild:${idGuild}`)
}

exports.deleteGuildConfig = async (idGuild) => {
  const filePath = path.join(configPath, `${idGuild}.json`)

  await files.deleteFile(filePath)

  log.info(`Elimine el config file de la guild:${idGuild}`)
}
