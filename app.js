document.addEventListener('DOMContentLoaded', function() {
  const body = document.querySelector('body');
  const location = document.getElementById('location');
  const weather = document.getElementById('result');
  const unit = document.getElementById('unit');
  const search = document.getElementById('search');
  const apiKey = 'c95bb6073d134458bd372704232110';


  let weatherData;
  let unitValue = unit.value;
  let locationValue = location.value;

  search.addEventListener('click', function() {
    locationValue = location.value;
    unitValue = unit.value;
    
    if (!locationValue) {
      alert('Please enter a location');
      return;
    }
    
    getWeather(locationValue, unitValue)
    .then(data => {
      displayWeatherData(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      document.getElementById('result').innerHTML = 'Error fetching weather data. Please try again.';
    });
});
  

    async function getWeather(locationValue, unitValue) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${locationValue}`, {mode: 'cors'});
    const data = await response.json();
    weatherData = data;

    return weatherData;
  }

  function displayWeatherData() {
    const place = weatherData.name;
    const condition = weatherData.current.condition.text;
    const icon = weatherData.current.condition.icon;
    const iconUrl = `https:${icon}`;
    let weatherHtml;

    if(unitValue === 'metric') {
    const temp = weatherData.current.temp_c;
    weatherHtml = `<h1>${locationValue}</h1><h2>${temp}°C</h2><h2>${condition}</h2><img src="${iconUrl}">`;
    }
    else {
    const temp = weatherData.current.temp_f;
    weatherHtml = `<h1>${locationValue}</h1><h2>${temp}°F</h2><h2>${condition}</h2><img src="${iconUrl}">`;
    }

    weather.innerHTML = weatherHtml;

    getGiphyGif(condition)
    .then(data => {
      body.style.backgroundImage = `url(${data})`;
    })

  }

  async function getGiphyGif(condition) {
    const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=o66h4umxvTgIbRbcpXtGpSyLWmbVXgMR&s=${condition}`, {mode: 'cors'});
    const gifData = await response.json();
    const gifUrl = gifData.data.images.original.url;
    return gifUrl;
  }
});

