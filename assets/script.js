var requestUrl =
  "https://api.openweathermap.org/data/2.5/forecast/daily?appid=3be2b2b6acc21e3760901d15acf91f72&q=Orlando";

var userInput = document.querySelector("#text-box");

var city = "";
var savedCity = [];

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
      } else {
        console.log(response);
        return response.json();
      }
    })
    .then((response) => {
      if (response.cod == 200) {
        savedCity = JSON.parse(localStorage.getItem("cityname")) || [];
        console.log(savedCity);
        savedCity.push(response.city.name);
        localStorage.setItem("cityname", JSON.stringify(savedCity));
      }
      renderForecast(response);
    })
    .catch((error) => console.log(error));

  // this.futureWeather(data));
  // $("#Temp0").html(response.main.temp);
  //console.log(response.main.temp);
}

const currentWeather = document.querySelector("#weather-display");

const futureWeather = document.querySelector("#future-weather");

function renderForecast(forecastData) {
  futureWeather.html = ``;
  for (var i = 1; i <= 5; i++) {
    //create a div 'forecastCard'
    const forecastCard = document.createElement("div");
    forecastCard.innerHTML = `<div class = "col-sm-1 forecast">
                  <p id="date0">${new Date(
                    forecastData.list[i].dt * 1000
                  ).toLocaleDateString()}</p>
                  <img src="https://openweathermap.org/img/wn/${
                    forecastData.list[i].weather[0].icon
                  }@2x.png"/>
                  <p>Temp: ${forecastData.list[i].temp.day}&#8457</p>
                  <p>Wind: ${forecastData.list[i].speed}MPH</p>
                  <p>Humidity: ${forecastData.list[i].humidity}%</p>`;
    futureWeather.append(forecastCard);
  }
  renderCurrent(forecastData);
}
function renderCurrent(currentData) {
  currentData.html = ``;
  const currentCard = document.createElement("div");
  currentCard.innerHTML = `<p id="city-heading"> ${new Date(
    currentData.list[0].dt * 1000
  ).toLocaleDateString()}</p>
  <p>Temp: ${currentData.list[0].temp.day}&#8457</p>
  <p>Wind: ${currentData.list[0].speed}MPH</p>
  <p>Humidity: ${currentData.list[0].humidity}%</p>`;
  currentWeather.append(currentCard);
}

function pastCity(pc) {
  var listEl = $("<li>" + pc() + "</li>");
  $(listEl).attr("class", "list-group-item");
  $(listEl).attr("data-value", pc());
  $(".list-group").append(listEl);
}

//append forecast card to future-weather
//console.log(forecastData.list[1]);
//}

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
