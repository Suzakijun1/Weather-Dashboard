var requestUrl =
  "https://api.openweathermap.org/data/2.5/forecast/daily?appid=3be2b2b6acc21e3760901d15acf91f72&q=";

var apiKey = "e081906e41053d0045aef1f5836faf73";

var userInput = document.querySelector("#text-box");

// fetch(requestUrl).then(console.log(data));

(fetchForecast = function (city) {
  var url = requestUrl + userInput + "&cnt=6&units=imperial";

  //function (lat, lon) {
  //   var url = requestUrl + "lat=" + lat;

  //   url += "&lon=" + lon; //+= used to make code look cleaner

  //   url += "&appid=" + apiKey;

  //var url = requestUrl + city + "&units=metric&appid=" + this.apiKey;
  console.log(url);
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        console.log(response);
        alert("invalid location");
      }
      console.log(response);
      return response.json();
    })
    .then((response) => console.log(response));
  // this.displayWeather(data));
})(
  (displayWeather = function (data) {
    const name = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const speed = data.wind;
    console.log(displayWeather);
  })
);
// function getApi() {
//   var requestUrl =
//     "api.openweathermap.org/data/2.5/forecast/daily?appid=3be2b2b6acc21e3760901d15acf91f72&q=Dallas&cnt=6&units=imperial";

//   fetch(requestUrl)
//     //.then(function (response) {
//     .then((data) => console.log(data));
//   return response.json();
// }

$("#search-button").on("click", fetchForecast());
