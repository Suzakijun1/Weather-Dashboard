var requestUrl =
  "https://api.openweathermap.org/data/2.5/forecast/daily?appid=3be2b2b6acc21e3760901d15acf91f72&q=";

var userInput = document.querySelector("#text-box");

var city = "";
var savedCity = [];

// fetch(requestUrl).then(console.log(data));

function fetchForecast(city) {
  //will input "userInput" here when I get this working
  var url = requestUrl + userInput.value + "&cnt=6&units=imperial";
  //clear previous forecast cards
  futureWeather.innerHTML = "";
  currentWeather.innerHTML = "";
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
    //retrieve list of previous saved cities and updates array
    .then((response) => {
      if (response.cod == 200) {
        //cod200 indicates that the api request was successful
        savedCity = JSON.parse(localStorage.getItem("cityname")) || [];
        console.log(savedCity);
        savedCity.push(response.city.name);
        localStorage.setItem("cityname", JSON.stringify(savedCity));
        pastCity(response.city.name);
      } //checks if the city name is already stored in "savedCity" array
      if (savedCity.indexOf(response.city.name) === -1) {
        savedCity.push(response.city.name);
        localStorage.setItem("cityname", JSON.stringify(savedCity));
        pastCity(response.city.name);
      }
      renderForecast(response);
    })
    .catch((error) => console.log(error));
}

const currentWeather = document.querySelector("#weather-display");

const futureWeather = document.querySelector("#future-weather");

// 5 day forecast function
function renderForecast(forecastData) {
  futureWeather.innerHTML = ``;
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
} //current weather function
function renderCurrent(currentData) {
  currentData.innerHTML = ``;
  const currentCard = document.createElement("div");
  currentCard.innerHTML = `<p id="city-heading"> ${new Date(
    currentData.list[0].dt * 1000
  ).toLocaleDateString()}</p>
  <p>Temp: ${currentData.list[0].temp.day}&#8457</p>
  <p>Wind: ${currentData.list[0].speed}MPH</p>
  <p>Humidity: ${currentData.list[0].humidity}%</p>`;
  currentWeather.append(currentCard);
}
//creates past cities history list
function pastCity(cityName) {
  var listEl = document.createElement("li");
  listEl.classList.add("list-group-item-action");
  listEl.setAttribute("data-value", cityName);
  document.querySelector(".list-group").appendChild(listEl);

  //applies a button to the cities
  var buttonEl = document.createElement("button");
  buttonEl.classList.add("btn", "btn-primary", "mt-2");
  buttonEl.setAttribute("type", "button");
  buttonEl.setAttribute("data-city", cityName);
  buttonEl.addEventListener("click", function () {
    fetchForecast(cityName);
  });
  buttonEl.textContent = cityName;
  listEl.appendChild(buttonEl);

  document.querySelector(".list-group").appendChild(listEl);
}

$("#search-button").on("click", fetchForecast);
