'use strict'
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const log = require('../../../utils/log')
const utils = require('../../../utils/utils')

const url_base = `https://github.com`
const url_trending = `${url_base}/trending`

exports.search = async () => {
  let $ = undefined

  let result = undefined
  try {
    result = await fetch(url_trending)
    result = await result.text()
    $ = cheerio.load(result)
  } catch (error) {
    log.errorHandler(error)
  }

  let response = []
  $('body > div.application-main > main > div.position-relative.container-lg.p-responsive.pt-6 > div > div:nth-child(2) > article').each(function () {

    const title = utils.trim($(this).find('h1 > a').text()).split(' ').join('')
    const description = utils.trim($(this).find('p').text())
    const url = `${url_base}/${title}`

    response.push({
      title,
      description,
      url
    })
  })

  return response
}
