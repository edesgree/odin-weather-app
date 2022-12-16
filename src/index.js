require('./mystyles.scss');
console.log('hello!sddd');

const button = document.getElementById('searchBtn');
const input = document.getElementById('searchInput');
const form = document.getElementById('form');
const result = document.getElementById('result');
const API_KEY = 'e2ead4f2ee6f037d43f3ec39032c2ba3';
let test = '';
async function fetchWeather(place) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=${API_KEY}`,
      { mode: 'cors' }
    );
    const weatherData = await response.json();

    console.log('weatherData', weatherData);
    test = weatherData;
    console.log('test', test);
    result.innerText = test;

    const newData = processData(weatherData);
    displayData(newData);
    // reset form
  } catch (error) {
    console.log(`there was an error : ${error}`);
  }
}
function processData(weatherData) {
  const myData = {
    condition: weatherData.weather[0].description,
    wind: weatherData,
    location: weatherData.name
  };
  return myData;
}
function displayData(newData) {
  result.innerText = newData.location;
  result.innerText += newData.condition;
}
form.addEventListener('submit', (e) => {
  e.preventDefault();
  fetchWeather(searchInput.value);
});
