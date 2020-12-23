'use strict'
const config = require('../../../config.json')
const fetch = require('node-fetch')

const url = `https://gnews.io/api/v4/search?q=tech&topic=programacion&lang=es&token=${config.GNEWS_TOKEN}`

exports.search = async () => {

  let result = undefined
  try {
    result = await fetch(url)
  } catch (error) {
    // error handler here
  }

  if (result === undefined) {
    // something to do here
  }

  try {
    result = await result.json()
  } catch (error) {
    // error handler here
  }

  let response = []
  result.articles.forEach(article => {
    response.push({ title: article.title, description: article.description, url: article.url })
  })

  return response
}
