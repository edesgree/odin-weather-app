require('./mystyles.scss');
import view from './js/view';
import data from './js/data';

const button = document.getElementById('searchBtn');
const input = document.getElementById('searchInput');
const form = document.getElementById('form');
const toggleTemp = document.querySelector('[data-toggle-temp]');
let currentCity = data.loadSavedCity();
let currentWeather = {};
let tempMode = 'c';
toggleTemp.firstElementChild.textContent = tempMode;

button.addEventListener('click', (e) => getCurrentWeather(searchInput.value));

form.addEventListener('submit', (e) => {
  e.preventDefault();
});

toggleTemp.addEventListener('click', (e) => {
  e.preventDefault();
  if (Object.keys(currentWeather).length === 0) return;
  tempMode === 'f' ? (tempMode = 'c') : (tempMode = 'f');
  toggleTemp.firstElementChild.textContent = tempMode;
  view.displayData(currentWeather, tempMode);
});

async function getCurrentWeather(currentCity) {
  try {
    currentWeather = await data.fetchWeather(currentCity);
    view.displayData(currentWeather, tempMode);
    data.saveToStorage(currentCity);
  } catch (error) {
    console.log('cannot get data from fetchweather', error);
  }
}

getCurrentWeather(currentCity);
