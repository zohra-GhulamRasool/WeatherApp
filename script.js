const apiKey = "f2d1349c64add8c5605bd56a4419cb24";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const errorElement = document.querySelector(".error");
const weatherElement = document.querySelector(".weather");

function updateWeather(data) {
    cityElement.innerHTML = data.name;
    tempElement.innerHTML = Math.round(data.main.temp) + "°C";
    humidityElement.innerHTML = data.main.humidity + "%";
    windElement.innerHTML = data.wind.speed + "km/h";

    switch (data.weather[0].main) {
        case "Clouds":
            weatherIcon.src = "https://cdn.iconscout.com/icon/free/png-256/weather-273-458700.png";
            break;
        case "Clear":
            weatherIcon.src = "https://cdn.iconscout.com/icon/free/png-256/sun-256-458686.png";
            break;
        case "Rain":
        case "Drizzle":
            weatherIcon.src = "https://cdn.iconscout.com/icon/free/png-256/rain-259-458689.png";
            break;
        case "Mist":
        case "Fog":
            weatherIcon.src = "https://cdn.iconscout.com/icon/free/png-256/mist-254-458687.png";
            break;
        default:
            weatherIcon.src = "https://cdn.iconscout.com/icon/free/png-256/weather-273-458700.png";
            break;
    }

    weatherElement.style.display = "block";
    errorElement.style.display = "none";
}

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
        errorElement.style.display = "block";
        weatherElement.style.display = "none";
    } else {
        const data = await response.json();
        updateWeather(data);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
        checkWeather(searchBox.value);
    }
});