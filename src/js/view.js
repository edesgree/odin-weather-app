const view = (() => {
  //dom display elements
  const result = document.getElementById('result');
  const resultCity = document.querySelector('[data-result-city]');
  const resultTemperature = document.querySelector('[data-result-temperature]');
  const resultFeelTemp = document.querySelector(
    '[data-result-feel-temperature]'
  );
  const resultHumidity = document.querySelector('[data-result-humidity]');
  const resultWind = document.querySelector('[data-result-wind]');
  const resultDesc = document.querySelector('[data-result-description]');
  const dataraw = document.querySelector('[data-raw]');

  function displayData(newData, tempScale) {
    //tempScale: f(farheineit) c(celcius) k(kelvin)
    console.log('displaydata', newData);
    if (!newData) return;
    console.log('newData', newData);
    console.log(
      `newData detail: desc:${newData.desc}, loc:${newData.location},wind:${newData.wind},temp:${newData.temperature},feel:${newData.feelLikeTemp},humidity:${newData.humidity}`
    );
    console.log(
      `newData.temperature.${tempScale}: ${newData.temperature[tempScale]}'`
    );

    console.log('newData.temperature.f', newData.temperature[tempScale]);
    console.log('newData.feelLikeTemp.f', newData.feelLikeTemp[tempScale]);
    console.log('newData.temperature.c', newData.temperature.c);
    console.log('newData.temperature.k', newData.temperature.k);
    console.log(
      `newData.temperature.${tempScale}: ${newData.temperature[tempScale]}'`
    );

    resultCity.textContent = newData.location;
    resultDesc.textContent = newData.desc;
    resultWind.textContent = newData.wind;
    resultTemperature.textContent = newData.temperature[tempScale];
    resultFeelTemp.textContent = newData.feelLikeTemp[tempScale];
    resultHumidity.textContent = newData.humidity;
  }
  return { displayData };
})();

export default view;
