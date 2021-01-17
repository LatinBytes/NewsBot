'use strict'
const utils = require('../../utils/utils')
const config = require('./config')

const flags = {
  topics: '-t',
  channels: '-c',
  repositories: '-r'
}

exports.command = async (args) => {
  let response = undefined

  const commands = utils.split(args.command)

  if (commands.includes('-h') || commands.includes('--help') || commands.includes('-help')) {
    return responseHelpMessage()
  }

  if (!commands.includes(...Object.values(flags))) {
    return responseErrorMessage()
  }

  const configGuild = parseArgsToConfig(commands)
  const configJsonGuild = parseConfigToJson(configGuild, args)

  response = createConfigGuild(configJsonGuild)

  return response
}

function responseErrorMessage() {
  const response = {}

  let message = `
No entiendo tu peticion, intenta con  \`$news -h\`
`

  response.message = message

  return response
}

function responseHelpMessage() {
  const response = {}

  let message = `
Hola! los comandos que entiendo son:
  **-r**: Esto es para los \`repositorios\`, especificar de que repocitorio quieres las noticias
  **-c**: Esto es para los \`canales\`, especificar en que canal quieres que publique las noticias
  **-t**: Esto es para los \`topicos\`, especificar que topicos quieres

**Ejemplos**:
  \`$news -c #nombre-del-canal #nombre-del-canal-2 -t javascript nodejs -r github gnews\`
    Lo que hace este comando, es que en el canal \`#nombre-del-canal\` y \`#nombre-del-canal-2\` recibiras 
    noticias relacionadas con \`javascript\` y \`nodejs\` provenientes de \`github\` y \`gnews\`
  
  \`$news -c -t -r\`
    Lo que hace este comando, es que en el canal donde escribiste el comando recibiras 
    noticias relacionadas con todos los topicos provenientes de todos los recursos

 \`$news -c -t javascript -r\`
    Lo que hace este comando, es que en el canal donde escribiste el comando recibiras 
    noticias relacionadas con \`javascript\` provenientes de todos los recursos

 \`$news -h\`
    Muestra este mensaje!

**Nota**: necesito recibir esas 3 vanderas **-r**, **-t**, **-c**
`

  response.message = message

  return response
}

function responseMessage(configJsonGuild) {
  const response = {}

  const channels = configJsonGuild.channels.map(item => `<#${item.id}>`)
  const topics = configJsonGuild.channels[0].topics
  const repositories = configJsonGuild.channels[0].repositories

  let message = `
Perfecto!! apartir de ahora recibirás en estos canales:
${utils.arrayToStringList(channels)}
Las ultimas noticias relacionadas con:
${utils.arrayToStringList(topics)}
De estas fuentes:
${utils.arrayToStringList(repositories)}
`

  response.message = message

  return response
}


function createConfigGuild(configJsonGuild) {
  config.saveGuildConfig(configJsonGuild.guild.id, configJsonGuild)
  return responseMessage(configJsonGuild)
}

function parseConfigToJson(configGuild, args) {
  validateGuildConfig(configGuild, args)

  const config = {
    guild: args.guild,
    channels: getJsonChannels(configGuild)
  }

  return config
}

function getJsonChannels(configGuild) {
  let response = []

  const channels = configGuild.channels

  for (let i = 0; i < channels.length; i++) {
    const channelID = utils.clearDiscordID(channels[i])

    const channel = {
      id: channelID,
      topics: configGuild.topics,
      repositories: configGuild.repositories
    }

    response.push(channel)
  }

  return response
}

function validateGuildConfig(configGuild, args) {
  if (configGuild.channels.length <= 0) {
    configGuild.channels.push(args.channel.id)
  }

  if (configGuild.topics.length <= 0) {
    configGuild.topics.push('all')
  }

  if (configGuild.repositories.length <= 0) {
    configGuild.repositories.push('all')
  }
}

function parseArgsToConfig(commands) {
  let response = {}

  for (const property in flags) {
    const arg = {
      commands,
      flag: flags[property]
    }

    response[property] = getFlagArguments(arg)
  }

  return response
}

function getFlagArguments(arg) {
  const response = []
  const commands = arg.commands
  const indexFlag = commands.indexOf(arg.flag)

  for (let i = (indexFlag + 1); i < commands.length; i++) {

    if (Object.values(flags).indexOf(commands[i]) > -1) {
      break
    }

    response.push(commands[i])
  }

  return response
}
