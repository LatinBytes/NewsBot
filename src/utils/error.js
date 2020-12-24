'use strict'
const chalk = require('chalk')

exports.errorHandler = (err) => {
  console.error(`${chalk.red('[error]')} ${err}`)
  console.error(err.stack)
}

exports.fatalErrorHandler = (err) => {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}
