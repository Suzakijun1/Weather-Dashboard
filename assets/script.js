var requestUrl =
  "api.openweathermap.org/data/2.5/forecast/daily?appid=3be2b2b6acc21e3760901d15acf91f72&q=Dallas&cnt=6&units=imperial";

function getApi() {
  var requestUrl =
    "api.openweathermap.org/data/2.5/forecast/daily?appid=3be2b2b6acc21e3760901d15acf91f72&q=Dallas&cnt=6&units=imperial";

  fetch(requestUrl).then(function (response) {
    return response.json();
  });
}

$("#search-button").on("click", getApi);
console.log(getApi);
