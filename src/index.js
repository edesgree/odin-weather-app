require('./scss/mystyles.scss');
import utils from './js/utils';
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

// toggle temperature between Celcius and Fareinheit
toggleTemp.addEventListener('click', (e) => {
  e.preventDefault();
  if (Object.keys(currentWeather).length === 0) return;
  tempMode === 'f' ? (tempMode = 'c') : (tempMode = 'f');
  toggleTemp.firstElementChild.textContent = tempMode;
  view.displayData(currentWeather, tempMode);
});

async function getCurrentWeather(currentCity) {
  try {
    view.loading.display = 'block';
    currentWeather = await data.fetchWeather(currentCity);
    view.loading.display = 'none';

    view.displayData(currentWeather, tempMode);
    data.saveToStorage(currentCity);
  } catch (error) {
    console.log('cannot get data from fetchweather', error);
  }
}
console.log('current city: ', currentCity);
console.log('newData.date time', utils.timeConverter('1671296274'));

function init() {
  //get parameters from browser url
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  // load page with url parameter or with currentCity in memory
  if (urlParams.has('search')) {
    getCurrentWeather(urlParams.get('search'));
  } else {
    getCurrentWeather(currentCity);
  }
}

init();
