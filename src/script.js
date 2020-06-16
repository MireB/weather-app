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

function search(city) {
  let apiKey = "9430278bf6c3175ec4b37df9d1ac0836";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#your-city").value;
  search(city);
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
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

let date = document.querySelector("#current-date");
let currentDate = new Date();
date.innerHTML = currentDateTime(currentDate);

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", submit);

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", currentLocation);

search("Amsterdam");
