require('./mystyles.scss');
import view from './js/view';
import data from './js/data';

const button = document.getElementById('searchBtn');
const input = document.getElementById('searchInput');
const form = document.getElementById('form');
const toggleTemp = document.querySelector('[data-toggle-temp]');

let currentCity;
let currentWeather = {};
let tempMode = 'c';
toggleTemp.firstElementChild.textContent = tempMode;

button.addEventListener('click', async () => {
  try {
    currentCity = searchInput.value;
    currentWeather = await data.fetchWeather(currentCity);
    console.log('currentWeather', currentWeather);
    view.displayData(currentWeather, tempMode);
  } catch (error) {
    console.log('error du click', error);
  }
});

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
