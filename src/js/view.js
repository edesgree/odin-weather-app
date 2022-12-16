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

  function displayData(newData) {
    console.log('displaydata', newData);
    if (!newData) return;
    console.log('newData', newData);
    console.log(
      `newData detail: desc:${newData.desc}, loc:${newData.location},wind:${newData.wind},temp:${newData.temperature},feel:${newData.feelLikeTemp},humidity:${newData.humidity}`
    );
    console.log('newData.temperature.f', newData.temperature.f);
    console.log('newData.temperature.c', newData.temperature.c);

    // for (const key in newData) {
    //   dataraw.textContent += ` : ${newData[key]}, `;
    // }

    for (const [key, value] of Object.entries(newData)) {
      console.log(`${key}: ${value}`);
      dataraw.textContent += ` ${key}: ${value}, `;
    }
    resultCity.textContent = newData.location;
    resultDesc.textContent = newData.desc;
    resultWind.textContent = newData.wind;
    resultTemperature.textContent = newData.temperature.c;
    resultFeelTemp.textContent = newData.feelLikeTemp;
    resultHumidity.textContent = newData.humidity;
  }
  return { displayData };
})();

export default view;
