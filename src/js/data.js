import view from './view';
import utils from './utils';

const data = (() => {
  const API_KEY = 'e2ead4f2ee6f037d43f3ec39032c2ba3';
  const DEFAULT_CITY = 'auckland';
  async function fetchWeather(place) {
    try {
      //fetch data from weather API
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=${API_KEY}`,
        { mode: 'cors' }
      );
      if (!response.ok) throw new Error(`City ${place} not found`);
      //parse data into json
      const weatherData = await response.json();
      console.log('weatherData', weatherData);
      // process data into a custom object, so we keep what we need only
      const newData = processData(weatherData);
      console.log('newData processed', newData);

      view.displayError(null);
      return newData;
    } catch (error) {
      console.log(`there was an error : ${error}`);
      view.displayError(error);
    }
  }
  // save to local storage
  function saveToStorage(obj) {
    localStorage.setItem('weatherCurrentCity', JSON.stringify(obj));
  }
  // load saved city from local storage
  function loadSavedCity() {
    if (localStorage.getItem('weatherCurrentCity') === null) {
      return DEFAULT_CITY;
    } else {
      return JSON.parse(localStorage.getItem('weatherCurrentCity'));
    }
  }
  //temperature conversion
  function KelvinToCelcius(k) {
    return (k - 273.15).toFixed(1);
  }
  function KelvinToFahrenheit(k) {
    return (1.8 * (k - 273) + 32).toFixed(1);
  }
  //create a custom object with weather data
  function processData(weatherData) {
    const myData = {
      desc: weatherData.weather[0].description,
      wind: weatherData.wind.speed,
      location: weatherData.name,
      icon: weatherData.weather[0].icon,
      temperature: {
        k: `${weatherData.main.temp}°K`,
        f: `${KelvinToFahrenheit(weatherData.main.temp)}°F`,
        c: `${KelvinToCelcius(weatherData.main.temp)}°C`
      },
      feelLikeTemp: {
        k: `${weatherData.main.feels_like}°K`,
        f: `${KelvinToFahrenheit(weatherData.main.feels_like)}°F`,
        c: `${KelvinToCelcius(weatherData.main.feels_like)}°C`
      },
      humidity: weatherData.main.humidity,
      date: utils.timeConverter(weatherData.dt)
    };
    return myData;
  }
  //giphy image
  async function fetchGIF(word) {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/translate?api_key=uRh1bQ2CXkAb9cGLoJEJdkehmoKdZ1NC&s=${word}`,
        {
          mode: 'cors'
        }
      );
      const gifData = await response.json();
      return gifData.data.images.original.url;
    } catch (error) {
      console.log(`there was an error with Giphy api: ${error}`);
    }
  }
  return { fetchWeather, loadSavedCity, saveToStorage, fetchGIF };
})();

export default data;
