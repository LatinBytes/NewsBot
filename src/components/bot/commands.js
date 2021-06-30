'use strict'
const utils = require('../../utils/utils')
const config = require('./config')
const Discord = require('discord.js')

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

  const message = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setDescription('No entiendo tu peticion, intenta con  \`$news -h\`')

  response.message = message

  return response
}

function responseHelpMessage() {
  const response = {}

  const message = new Discord.MessageEmbed()
    .setColor('#FFFF00')
    .setDescription(`Hola! Este es el mensaje de ayuda! y estos son los argumentos que necesito`)
    .addFields(
      { name: '-r', value: `Esto es para los \`repositorios\`, especifica de cual repocitorio quieres las noticias`, inline: true },
      { name: '-c', value: `Esto es para los \`canales\`, especifica en cual canal quieres que publique las noticias`, inline: true },
      { name: '-t', value: `Esto es para los \`topicos\`, especifica que topicos quieres`, inline: true },
      { name: '\u200B', value: '\u200B' },
      {
        name: 'Ejemplos', value: `\`$news -c #nombre-del-canal #nombre-del-canal-2 -t javascript nodejs -r github_scraper gnews\`
    Lo que hace este comando, es que en el canal **#nombre-del-canal** y **#nombre-del-canal-2** recibiras noticias relacionadas con **javascript** y **nodejs** provenientes de **github** y **gnews**
  
  \`$news -c -t -r\`
    Lo que hace este comando, es que en el canal donde escribiste el comando recibiras 
    noticias relacionadas con todos los topicos provenientes de todos los recursos

 \`$news -c -t javascript -r\`
    Lo que hace este comando, es que en el canal donde escribiste el comando recibiras 
    noticias relacionadas con **javascript** provenientes de todos los recursos

 \`$news -h\`
    Muestra este mensaje!
` }
    )

  response.message = message

  return response
}

function responseMessage(configJsonGuild) {
  const response = {}

  const channels = configJsonGuild.channels.map(item => `<#${item.id}>`)
  const topics = configJsonGuild.channels[0].topics
  const repositories = configJsonGuild.channels[0].repositories

  const message = new Discord.MessageEmbed()
    .setColor('#00FF33')
    .setDescription('Perfecto!! apartir de ahora recibirás las ultimas noticias con estas configuraciones')
    .addFields(
      {name: 'Canales', value: `${utils.arrayToStringList(channels)}`},
      {name: 'Topicos', value: `${utils.arrayToStringList(topics)}`},
      {name: 'Repositorios', value: `${utils.arrayToStringList(repositories)}`}
    )

  response.message = message

  return response
}

function createConfigGuild(configJsonGuild) {
  config.saveGuildConfig(configJsonGuild.guild.id, configJsonGuild)
  return responseMessage(configJsonGuild)
}

function parseConfigToJson(configGuild, args) {
  validateGuildConfig(configGuild, args)

  return {
    guild: args.guild,
    channels: getJsonChannels(configGuild)
  }
}

function getJsonChannels(configGuild) {
  let response = []

  const channels = configGuild.channels

  for (const ch of channels) {
    const channelID = utils.clearDiscordID(ch)

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
