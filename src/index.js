require('./mystyles.scss');
console.log('hello!sddd');

const button = document.getElementById('searchBtn');
const input = document.getElementById('searchInput');
const form = document.getElementById('form');
const API_KEY = 'e2ead4f2ee6f037d43f3ec39032c2ba3';

async function fetchWeather(place) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=${API_KEY}`,
      { mode: 'cors' }
    );
    const weatherData = await response.json();
    console.log('weatherData', weatherData);
  } catch (error) {
    console.log(`there was an error : ${error}`);
  }
}

form.addEventListener('submit', (e) => {
  fetchWeather(search.value);
  console.log(search.value);
  e.preventDefault();
});
