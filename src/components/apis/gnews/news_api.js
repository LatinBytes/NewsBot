'use strict'
const fetch = require('node-fetch')
const log = require('../../../utils/log')

let url = `https://gnews.io/api/v4/search?q=tech&topic=programacion&lang=es&token=${process.env.GNEWS_TOKEN}`

//funcion exportada para optener  informacion
exports.search = async () => {
  const interval_minutes = 15
  const ms_per_minute = 60000
  let current_date = Date.now()

  let fromDate = new Date(
    current_date - (interval_minutes * ms_per_minute)
  ).toISOString()

  url = `${url}&from=${fromDate}`

  let result = undefined
  try {
    result = await fetch(url)
    result = await result.json()
  } catch (error) {
    log.errorHandler(error)
  }

  let response = []
  result.articles.forEach((article) => {
    response.push({
      title: article.title,
      description: article.description,
      url: article.url,
    })
  })

  return response
}
