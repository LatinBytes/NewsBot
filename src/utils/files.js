'use strict'
const fs = require('fs')

exports.getFilesDirectory = async (directory) => {
  fs.readdir(directory, (err, files) => {
    if (err) {
      return console.log('Unable to scan directory: ' + err)
    }

    console.log('files')
    console.log(files)
    console.log('files')

    console.log()

    files.forEach((file) => {
      console.log('file')
      console.log(file)
      console.log('file')
    })
  })
}

exports.deleteFile = async (fileDir) => {
  fs.unlinkSync(fileDir)
}

exports.saveFile = async (fileDir, content) => {
  fs.writeFileSync(fileDir, content)
}
