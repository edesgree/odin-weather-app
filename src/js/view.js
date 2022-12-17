const view = (() => {
  //dom display elements
  const resultCity = document.querySelector('[data-result-city]');
  const resultTemperature = document.querySelector('[data-result-temperature]');
  const resultFeelTemp = document.querySelector(
    '[data-result-feel-temperature]'
  );
  const resultHumidity = document.querySelector('[data-result-humidity]');
  const resultWind = document.querySelector('[data-result-wind]');
  const resultDesc = document.querySelector('[data-result-description]');
  const resultDate = document.querySelector('[data-result-date]');
  const resultIcon = document.querySelector('[data-result-icon]');
  const resultGIF = document.querySelector('[data-result-gif]');
  const loading = document.getElementById('loading');
  const message = document.querySelector('[data-message]');
  const messageText = document.querySelector('[data-message-text]');
  function displayData(newData, tempScale, GIFsrc) {
    //tempScale: f(farheineit) c(celcius) k(kelvin)
    if (!newData) return;

    resultCity.textContent = newData.location;
    resultDesc.textContent = newData.desc;
    resultDate.textContent = newData.date;
    resultWind.textContent = newData.wind;
    resultTemperature.textContent = newData.temperature[tempScale];
    resultFeelTemp.textContent = newData.feelLikeTemp[tempScale];
    resultHumidity.textContent = newData.humidity;
    resultIcon.src = `http://openweathermap.org/img/wn/${newData.icon}@2x.png`;
    resultGIF.style.backgroundImage = `url(${GIFsrc})`;
  }
  function displayError(error) {
    if (error === null) {
      view.message.style.display = 'none';
    } else {
      console.log('display error', error);
      view.message.style.display = 'block';
      console.log('view.message', view.message);
      view.messageText.textContent = error;
    }
  }
  return { displayData, displayError, loading, message, messageText };
})();

export default view;
