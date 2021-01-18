'use strict'
const fs = require('fs')

exports.getFilesDirectory = (directory) => {
  return fs.readdirSync(directory)
}

exports.deleteFile = (fileDir) => {
  fs.unlinkSync(fileDir)
}

exports.saveFile = (fileDir, content) => {
  fs.writeFileSync(fileDir, content)
}
