'use strict'

exports.trim = (string) => {
  return string.replace(/\s\s+|\n/g, '')
}
