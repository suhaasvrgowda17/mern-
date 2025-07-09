const apiKey = '6dbf2b63d44f347b71488c2996fba580'; // Replace with your OpenWeatherMap API key
const city = 'London'; // Default city

const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const loadingDiv = document.getElementById('loading');

function setLoading(isLoading) {
    loadingDiv.style.display = isLoading ? 'block' : 'none';
}

function updateWeatherCard(data) {
    document.getElementById('city').textContent = data.name;
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)} °C`;
    document.getElementById('feels-like').textContent = `Feels like: ${Math.round(data.main.feels_like)} °C`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
    document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
    document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById('weather-description').textContent = data.weather[0].description;
    document.getElementById('last-updated').textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
}

function fetchWeatherData(cityName = city) {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            updateWeatherCard(data);
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
            alert('Error fetching weather data. Please try again.');
            console.error('Error fetching weather data:', error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData();

    document.getElementById('refresh-button').addEventListener('click', () => {
        alert('Refreshing weather data...');
        location.reload();
    });

    searchButton.addEventListener('click', () => {
        const cityName = cityInput.value.trim();
        if (cityName) fetchWeatherData(cityName);
    });
});
