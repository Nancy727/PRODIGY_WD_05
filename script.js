const apiKey = '694a823e160af13e17a989293c75193b';
const weatherDisplay = document.getElementById('weatherDisplay');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const locationInput = document.getElementById('locationInput');

getWeatherBtn.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            weatherDisplay.innerHTML = 'Error fetching weather data. Please try again.';
        });
}

function displayWeather(data) {
    if (data.cod === 200) {
        const { name, main, weather, wind, sys } = data;
        weatherDisplay.innerHTML = `
            <h2>Weather in ${name}</h2>
            <p><strong>Temperature:</strong> ${main.temp} °C</p>
            <p><strong>Feels Like:</strong> ${main.feels_like} °C</p>
            <p><strong>Weather:</strong> ${weather[0].description}</p>
            <p><strong>Humidity:</strong> ${main.humidity}%</p>
            <p><strong>Pressure:</strong> ${main.pressure} hPa</p>
            <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
            <p><strong>Sunrise:</strong> ${new Date(sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p><strong>Sunset:</strong> ${new Date(sys.sunset * 1000).toLocaleTimeString()}</p>
        `;
        weatherDisplay.style.display = 'block';
    } else {
        weatherDisplay.innerHTML = 'Location not found. Please try again.';
    }
}
