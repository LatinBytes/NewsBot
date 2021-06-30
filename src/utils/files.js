'use strict'
const fs = require('fs')
const log = require('../utils/log')

exports.getFilesDirectory = async (directory) => {
  return fs.promises.readdir(directory)
}

exports.deleteFile = async (fileDir) => {
  await fs.promises.unlink(fileDir)
}

exports.saveFile = async (fileDir, content) => {
  await fs.promises.writeFile(fileDir, content)
}
