//e2df3fe934e8aeb9013edd9ebbb61d22
const fetch = require("node-fetch");
var i = 0;
function search() {
  fetch(
    "https://gnews.io/api/v4/search?q=tech&topic=programacion&lang=es&token=e2df3fe934e8aeb9013edd9ebbb61d22"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      i++;
      if (data.articles) {
        console.log(data.articles[i].title, data.articles[i].description);
      } else search();
    });
}
setInterval(() => {
  search();
}, 50000);
