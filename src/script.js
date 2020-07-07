function currentDateTime(time) {
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let month = time.getMonth();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let day = currentDate.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thurday",
    "Friday",
    "Saturday",
  ];
  return `${days[day]} ${day} ${months[month]}, ${hours}:${minutes}`;
}

function formatHours(timestamp) {
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  retunr`${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.list[0];

  forecastElement.innerHTML;
  `
    <div class="col-2">
      <h5>${formatHours(forecast.dt * 1000)}</h5>
      <img 
      src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}d@2x.png"
      alt=

      />
      <br />
      <strong>${Math.round(forecast.main.temp_max)}˚</strong>${Math.round(
    forecast.main.temp_min
  )}˚
    </div>

    forecast = response.data.list[1];

  `;
}

function search(city) {
  let apiKey = "9430278bf6c3175ec4b37df9d1ac0836";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metrics`;
  axios.get(apiUrl).then(displayForecast);
}

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#your-city").value;
  search(city);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  let fahreinheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahreinheitTemperature);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function searchLocation(position) {
  let apiKey = "9430278bf6c3175ec4b37df9d1ac0836";
  let apiUrlLocation = `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon={position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayTemperature(response) {
  document.querySelector("#location").innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;

  document.querySelector("#temperature").innerHTML = Math.round(
    celsiusTemperature
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

let date = document.querySelector("#current-date");
let currentDate = new Date();
date.innerHTML = currentDateTime(currentDate);

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", submit);

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", currentLocation);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-temp");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-temp");
celsiusLink.addEventListener("click", displayCelsiusTemp);

search("Amsterdam");
