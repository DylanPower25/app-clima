const API_KEY = 'e5827e7fcee138e46d581965bc8431c8';

const obtenerClima = position => {
    const { latitude, longitude } = position.coords;
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
    fetch(url)
        .then(response => response.json())
        .then(data => setWeatherData(data))
        .catch(error => console.error('Error fetching weather data:', error));

    console.log(position);
};

const setWeatherData = data => {
    const weatherData = {
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: data.main.temp,
        date: getDate(),
    };
    Object.keys(weatherData).forEach(key => {
        document.getElementById(key).textContent = weatherData[key];
    });
};

const getDate = () => {
    const date = new Date();
    return `${date.getDate()}-${(date.getMonth() + 1)}-${date.getFullYear()}`;
};

const onload = () => {
    navigator.geolocation.getCurrentPosition(obtenerClima);
};