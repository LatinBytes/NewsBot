'use strict'
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const errorHandler = require('../../../utils/error')
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
    errorHandler.errorHandler(error)
  }

  let response = []
  $('body > div.application-main > main > div.explore-pjax-container.container-lg.p-responsive.pt-6 > div > div:nth-child(2) > article').each(function () {

    const title = utils.trim($(this).find('h1 > a').text()).split(' ').join('')
    const description = utils.trim($(this).find('p').text())
    const url = `${url_base}/${title}`

    response.push({
      title,
      description,
      url
    })
  })

  console.log(response)
  return response
}
