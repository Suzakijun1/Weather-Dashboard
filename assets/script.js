var requestUrl =
  "https://api.openweathermap.org/data/2.5/forecast/daily?appid=3be2b2b6acc21e3760901d15acf91f72&q=Orlando";

var userInput = document.querySelector("#text-box");

// fetch(requestUrl).then(console.log(data));

function fetchForecast(city) {
  //will input "userInput" here when I get this working
  var url = requestUrl + "&cnt=6&units=imperial";

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
    .then((response) => renderForecast(response));
  // this.futureWeather(data));
  // $("#Temp0").html(response.main.temp);
  //console.log(response.main.temp);
}

function renderForecast(forecastData) {
  $("#future-weather").html(
    `<div class = "col-sm-2 big-primary forecast">
                <p id="date0"></p>
                herouwegroiwageup9eg
                <p id="Img0"></p>
                <p>lkjwgeojigweapoi: <span id="Temp0"></span></p>
                <p>Humidity: <span id="humidity0">hello world</span></p>`
  );
  console.log(forecastData.list[0].temp.day);
}

function futureWeather(data) {
  //const name = data;
  //const { icon, description } = data.weather[0];
  //const temp = list[0].temp.day;
  //const speed = data.wind;
  // $("#Temp0").html(temp);
  console.log("future weather");
}
futureWeather();

$("#search-button").on("click", fetchForecast);
