require('./mystyles.scss');
import view from './js/view';
import data from './js/data';

const button = document.getElementById('searchBtn');
const input = document.getElementById('searchInput');
const form = document.getElementById('form');

button.addEventListener('click', async () => {
  //e.preventDefault();
  try {
    console.log('clic');
    const weather = await data.fetchWeather(searchInput.value);
    console.log('weather', weather);
    view.displayData(weather);
  } catch (error) {
    console.log('error du click', error);
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
});
