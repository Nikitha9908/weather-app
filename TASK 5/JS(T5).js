document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const weatherInfo = document.getElementById('weatherInfo');
    const getWeatherButton = document.getElementById('getWeather');
    const locationInput = document.getElementById('locationInput');

    function fetchWeather(location) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    const { name, weather, main } = data;
                    const weatherHTML = `
                        <h2>Weather in ${name}</h2>
                        <p>${weather[0].description}</p>
                        <p>Temperature: ${main.temp}°C</p>
                        <p>Humidity: ${main.humidity}%</p>
                        <p>Pressure: ${main.pressure} hPa</p>
                    `;
                    weatherInfo.innerHTML = weatherHTML;
                } else {
                    weatherInfo.innerHTML = `<p>Error: ${data.message}</p>`;
                }
            })
            .catch(error => {
                weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
            });
    }

    getWeatherButton.addEventListener('click', () => {
        const location = locationInput.value.trim();
        if (location) {
            fetchWeather(location);
        } else {
            weatherInfo.innerHTML = '<p>Please enter a location.</p>';
        }
    });
});
