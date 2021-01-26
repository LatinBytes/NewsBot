'use strict'
const chalk = require('chalk')

exports.info = (msg) => {
  console.log(`${chalk.green('[INFO]')} ${msg}`)
}

exports.errorHandler = (err) => {
  console.error(`${chalk.red('[ERROR]')} ${err}`)
  console.error(err.stack)
}

exports.fatalErrorHandler = (err) => {
  console.error(`${chalk.red('[FATAL ERROR]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}
