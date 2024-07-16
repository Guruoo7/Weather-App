document.getElementById('getWeatherBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if (city) {
        getWeather(city);
    }
});

function getWeather(city) {
    const apiKey = '88ab8858665858f0f5b6ef4832aa9913';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                document.getElementById('cityName').textContent = data.name;
                document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
                document.getElementById('description').textContent = `Weather: ${data.weather[0].description}`;
                document.getElementById('weatherIcon').src = getWeatherIcon(data.weather[0].main);
                document.getElementById('weatherIcon').classList.remove('hidden');
                document.getElementById('weatherInfo').classList.remove('hidden');
            } else {
                alert('City not found. Please enter a valid city name.');
                document.getElementById('weatherInfo').classList.add('hidden');
            }
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            alert('An error occurred. Please try again.');
        });
}

function getWeatherIcon(weather) {
    const weatherIcons = {
        Clear: 'https://openweathermap.org/img/wn/01d.png',
        Clouds: 'https://openweathermap.org/img/wn/03d.png',
        Rain: 'https://openweathermap.org/img/wn/09d.png',
        Drizzle: 'https://openweathermap.org/img/wn/10d.png',
        Thunderstorm: 'https://openweathermap.org/img/wn/11d.png',
        Snow: 'https://openweathermap.org/img/wn/13d.png',
        Mist: 'https://openweathermap.org/img/wn/50d.png'
    };
    return weatherIcons[weather] || 'https://openweathermap.org/img/wn/01d.png';
}

