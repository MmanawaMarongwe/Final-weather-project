function formatTime(timestamp){

    let now = new Date(timestamp);
    let weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  
     let day = weekDays[now.getDay()];
     let hour = now.getHours();
     let minutes = now.getMinutes();
     if (minutes<0){
        minutes = `0${minutes}`;
     }
     return `Last updated on  ${day} ${hour}:${minutes}`;
  }
  
function displayForecast(){
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu","Fri", "Sat", "Sun", "Mon "];
  days.forEach(function(day){
  forecastHTML = forecastHTML + `            
  
  <div class="col-2">
    <div class="weather-forecast-date">${day}</div>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdUijW8Pl6X57WSf5jgv0q00gtqFw0w0saJw&usqp=CAU" alt="" width="36" >
    <div class="weather-forecast-temperatures">
      <span class="temperature-max">18</span>
      <span class="temperature-min">12</span>
    </div>
  </div>
`;
  })  
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
  
function displayJohannesburg(response){
    let cityElement = document.querySelector("#city");
    let temperatureElement = document.querySelector("#temperature");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");

    celciusTemp = response.data.temperature.current

    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(celciusTemp);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = ` Humidity: ${response.data.temperature.humidity} %`;
    windElement.innerHTML = ` Wind: ${response.data.wind.speed} km/h`;  
    dateElement.innerHTML = formatTime(response.data.time *1000);
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src",`${response.data.condition.icon_url}`);
    iconElement.setAttribute("alt",  response.data.condition.icon);
}

function search(city){
    let apiKey = "e6ba34ft27a3a8ccco506b17217f3b8b";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(displayJohannesburg);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheit(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celciusTemp  * 9/5) + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelcius(event){
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemp);
}

let celciusTemp = null
displayForecast();
search("Johannesburg");


let form = document.querySelector("#search-bar");
form.addEventListener("submit", handleSubmit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelcius)

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit)