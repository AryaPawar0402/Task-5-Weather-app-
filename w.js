function getWeather() {
    const apiKey = '7109406d0525e079cc7e69c37dada73b';
    const city = document.getElementById('city').value; // Use .value to get the input value
    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    // Fetch current weather data
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data); // Display current weather
        })
        .catch(error => {
            console.error('Error fetching current weather data', error);
            alert('Error fetching current weather data. Please try again.');
        });

    // Fetch hourly forecast data
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list); // Display hourly forecast
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data', error);
            alert('Error fetching forecast data. Please try again.');
        });
}

function displayWeather(data) {
    // Display current weather
    const tempDiv = document.getElementById('temp-div');
    const weatherInfo = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');

    // Display temperature
    tempDiv.innerHTML = `<p>${Math.round(data.main.temp)}°C</p>`;

    // Display weather description
    weatherInfo.innerHTML = `<p>${data.weather[0].description}</p>`;

    // Display weather icon
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}.png`;
    weatherIcon.style.display = 'block'; // Show the icon
}

function displayHourlyForecast(forecast) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    hourlyForecastDiv.innerHTML = ''; // Clear any previous forecast data

    // Loop through the forecast data (we will display every 3 hours for the next 5 days)
    for (let i = 0; i < forecast.length; i += 8) {
        const hourlyItem = document.createElement('div');
        hourlyItem.classList.add('hourly-item');

        // Get the hour and temperature
        const hour = new Date(forecast[i].dt * 1000).getHours(); // Convert timestamp to hours
        const temp = Math.round(forecast[i].main.temp);

        // Get the weather icon
        const iconCode = forecast[i].weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        // Create HTML for each hourly item
        hourlyItem.innerHTML = `
            <img src="${iconUrl}" alt="weather icon">
            <p>${hour}:00</p>
            <p>${temp}°C</p>
        `;

        // Append the hourly item to the hourly forecast container
        hourlyForecastDiv.appendChild(hourlyItem);
    }
}
