"use strict";
const config = require("../../../config.json");
const fetch = require("node-fetch");

exports.search = async (interval_minutes) => {
  const ms_per_minute = 60000;
  let current_date = Date.now();
  let date = new Date(
    current_date - interval_minutes * ms_per_minute
  ).toISOString();

  const url = `https://gnews.io/api/v4/search?q=tech&topic=programacion&from=${date}&lang=es&token=${config.GNEWS_TOKEN}`;

  let result = undefined;
  try {
    result = await fetch(url);
    result = await result.json();

    let response = [];
    result.articles.forEach((article) => {
      response.push({
        title: article.title,
        description: article.description,
        url: article.url,
      });
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
