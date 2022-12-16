const data = (() => {
  const API_KEY = 'e2ead4f2ee6f037d43f3ec39032c2ba3';

  async function fetchWeather(place) {
    try {
      console.log('fetchWeather');
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=${API_KEY}`,
        { mode: 'cors' }
      );
      if (!response.ok) throw new Error(`City ${place} not found`);

      const weatherData = await response.json();

      console.log('weatherData', weatherData);

      const newData = processData(weatherData);
      console.log('newData processed', newData);
      return newData;

      // reset form
    } catch (error) {
      console.log(`there was an error : ${error}`);
    }
  }
  function KelvinToCelcius(k) {
    return k - 273.15;
  }
  function KelvinToFahrenheit(k) {
    return 1.8 * (k - 273) + 32;
  }
  function processData(weatherData) {
    const myData = {
      desc: weatherData.weather[0].description,
      wind: weatherData.wind.speed,
      location: weatherData.name,
      temperature: {
        k: weatherData.main.temp,
        f: KelvinToFahrenheit(weatherData.main.temp),
        c: KelvinToCelcius(weatherData.main.temp)
      },
      feelLikeTemp: weatherData.main.feels_like,
      humidity: weatherData.main.humidity
    };
    return myData;
  }
  return { fetchWeather };
})();

export default data;
