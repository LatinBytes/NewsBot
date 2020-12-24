'use strict'
const config = require('../../../config.json')
const fetch = require('node-fetch')
const errorHandler = require('../../utils/error')

const url = `https://gnews.io/api/v4/search?q=tech&topic=programacion&lang=es&token=${config.GNEWS_TOKEN}`

exports.search = async () => {

  let result = undefined
  try {
    result = await fetch(url)
  } catch (error) {
    errorHandler.errorHandler(error)
  }

  try {
    result = await result.json()
  } catch (error) {
    errorHandler.errorHandler(error)
  }

  let response = []
  result.articles.forEach(article => {
    response.push({ title: article.title, description: article.description, url: article.url })
  })

  return response
}
