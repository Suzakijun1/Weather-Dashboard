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
const futureWeather = document.querySelector("#future-weather");

function renderForecast(forecastData) {
  futureWeather.html = ``;
  for (var i = 1; i <= 5; i++) {
    //create a div 'forecastCard'
    const forecastCard = document.createElement("div");
    forecastCard.innerHTML = `<div class = "col-sm-2 big-primary forecast">
                  <p id="date0">${new Date(
                    forecastData.list[i].dt * 1000
                  ).toLocaleDateString()}</p>
                  <img src="https://openweathermap.org/img/wn/${
                    forecastData.list[i].weather[0].icon
                  }@2x.png"/>
                  <p>Temp: ${forecastData.list[i].temp.day}</p>
                  <p>Humidity: ${forecastData.list[i].humidity}</p>`;

    futureWeather.append(forecastCard);
  }

  //append forecast card to future-weather
  console.log(forecastData.list[1]);
}

//function futureWeather(data) {
//const name = data;
//const { icon, description } = data.weather[0];
//const temp = list[0].temp.day;
//const speed = data.wind;
// $("#Temp0").html(temp);
// console.log("future weather");
//}
//futureWeather();

$("#search-button").on("click", fetchForecast);
