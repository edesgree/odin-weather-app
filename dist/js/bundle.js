/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/mystyles.scss":
/*!********************************!*\
  !*** ./src/scss/mystyles.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://bulma-webpack/./src/scss/mystyles.scss?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/utils */ \"./src/js/utils.js\");\n/* harmony import */ var _js_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/view */ \"./src/js/view.js\");\n/* harmony import */ var _js_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/data */ \"./src/js/data.js\");\n__webpack_require__(/*! ./scss/mystyles.scss */ \"./src/scss/mystyles.scss\");\n\n\n\n\nconst button = document.getElementById('searchBtn');\nconst input = document.getElementById('searchInput');\nconst form = document.getElementById('form');\nconst toggleTemp = document.querySelector('[data-toggle-temp]');\nlet currentCity = _js_data__WEBPACK_IMPORTED_MODULE_2__[\"default\"].loadSavedCity();\nlet currentWeather = {};\nlet currentWeatherGIF;\nlet tempMode = 'c';\n\nbutton.addEventListener('click', (e) => getCurrentWeather(searchInput.value));\n\nform.addEventListener('submit', (e) => {\n  e.preventDefault();\n});\n\n// toggle temperature between Celcius and Fareinheit\ntoggleTemp.addEventListener('click', (e) => {\n  e.preventDefault();\n  if (Object.keys(currentWeather).length === 0) return;\n  tempMode === 'f' ? (tempMode = 'c') : (tempMode = 'f');\n  toggleTemp.classList.toggle('active');\n  _js_view__WEBPACK_IMPORTED_MODULE_1__[\"default\"].displayData(currentWeather, tempMode, currentWeatherGIF);\n});\n\nasync function getCurrentWeather(currentCity) {\n  try {\n    _js_view__WEBPACK_IMPORTED_MODULE_1__[\"default\"].loading.display = 'block';\n    currentWeather = await _js_data__WEBPACK_IMPORTED_MODULE_2__[\"default\"].fetchWeather(currentCity);\n    currentWeatherGIF = await _js_data__WEBPACK_IMPORTED_MODULE_2__[\"default\"].fetchGIF(currentWeather.desc);\n    console.log('currentWeatherGIF', currentWeatherGIF);\n    _js_view__WEBPACK_IMPORTED_MODULE_1__[\"default\"].loading.display = 'none';\n\n    _js_view__WEBPACK_IMPORTED_MODULE_1__[\"default\"].displayData(currentWeather, tempMode, currentWeatherGIF);\n    _js_data__WEBPACK_IMPORTED_MODULE_2__[\"default\"].saveToStorage(currentCity);\n  } catch (error) {\n    console.log('cannot get data from fetchweather', error);\n  }\n}\n\nfunction init() {\n  //get parameters from browser url\n  const queryString = window.location.search;\n  const urlParams = new URLSearchParams(queryString);\n  // load page with url parameter or with currentCity in memory\n  if (urlParams.has('search')) {\n    getCurrentWeather(urlParams.get('search'));\n  } else {\n    getCurrentWeather(currentCity);\n  }\n}\n\ninit();\n\n\n//# sourceURL=webpack://bulma-webpack/./src/index.js?");

/***/ }),

/***/ "./src/js/data.js":
/*!************************!*\
  !*** ./src/js/data.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view */ \"./src/js/view.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./src/js/utils.js\");\n\n\n\nconst data = (() => {\n  const API_KEY = 'e2ead4f2ee6f037d43f3ec39032c2ba3';\n  const DEFAULT_CITY = 'auckland';\n  async function fetchWeather(place) {\n    try {\n      //fetch data from weather API\n      const response = await fetch(\n        `https://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=${API_KEY}`,\n        { mode: 'cors' }\n      );\n      if (!response.ok) throw new Error(`City ${place} not found`);\n      //parse data into json\n      const weatherData = await response.json();\n      console.log('weatherData', weatherData);\n      // process data into a custom object, so we keep what we need only\n      const newData = processData(weatherData);\n      console.log('newData processed', newData);\n\n      _view__WEBPACK_IMPORTED_MODULE_0__[\"default\"].displayError(null);\n      return newData;\n    } catch (error) {\n      console.log(`there was an error : ${error}`);\n      _view__WEBPACK_IMPORTED_MODULE_0__[\"default\"].displayError(error);\n    }\n  }\n  // save to local storage\n  function saveToStorage(obj) {\n    localStorage.setItem('weatherCurrentCity', JSON.stringify(obj));\n  }\n  // load saved city from local storage\n  function loadSavedCity() {\n    if (localStorage.getItem('weatherCurrentCity') === null) {\n      return DEFAULT_CITY;\n    } else {\n      return JSON.parse(localStorage.getItem('weatherCurrentCity'));\n    }\n  }\n  //temperature conversion\n  function KelvinToCelcius(k) {\n    return (k - 273.15).toFixed(1);\n  }\n  function KelvinToFahrenheit(k) {\n    return (1.8 * (k - 273) + 32).toFixed(1);\n  }\n  //create a custom object with weather data\n  function processData(weatherData) {\n    const myData = {\n      desc: weatherData.weather[0].description,\n      wind: weatherData.wind.speed,\n      location: weatherData.name,\n      icon: weatherData.weather[0].icon,\n      temperature: {\n        k: `${weatherData.main.temp}°K`,\n        f: `${KelvinToFahrenheit(weatherData.main.temp)}°F`,\n        c: `${KelvinToCelcius(weatherData.main.temp)}°C`\n      },\n      feelLikeTemp: {\n        k: `${weatherData.main.feels_like}°K`,\n        f: `${KelvinToFahrenheit(weatherData.main.feels_like)}°F`,\n        c: `${KelvinToCelcius(weatherData.main.feels_like)}°C`\n      },\n      humidity: weatherData.main.humidity,\n      date: _utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"].timeConverter(weatherData.dt)\n    };\n    return myData;\n  }\n  //giphy image\n  async function fetchGIF(word) {\n    try {\n      const response = await fetch(\n        `https://api.giphy.com/v1/gifs/translate?api_key=uRh1bQ2CXkAb9cGLoJEJdkehmoKdZ1NC&s=${word}`,\n        {\n          mode: 'cors'\n        }\n      );\n      const gifData = await response.json();\n      return gifData.data.images.original.url;\n    } catch (error) {\n      console.log(`there was an error with Giphy api: ${error}`);\n    }\n  }\n  return { fetchWeather, loadSavedCity, saveToStorage, fetchGIF };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (data);\n\n\n//# sourceURL=webpack://bulma-webpack/./src/js/data.js?");

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst utils = (() => {\n  // convert timestamp into date\n  function timeConverter(UNIX_timestamp) {\n    var a = new Date(UNIX_timestamp * 1000);\n    var months = [\n      'Jan',\n      'Feb',\n      'Mar',\n      'Apr',\n      'May',\n      'Jun',\n      'Jul',\n      'Aug',\n      'Sep',\n      'Oct',\n      'Nov',\n      'Dec'\n    ];\n    var year = a.getFullYear();\n    var month = months[a.getMonth()];\n    var date = a.getDate();\n    var hour = a.getHours();\n    var min = a.getMinutes();\n    var sec = a.getSeconds();\n    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;\n    return time;\n  }\n  return { timeConverter };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (utils);\n\n\n//# sourceURL=webpack://bulma-webpack/./src/js/utils.js?");

/***/ }),

/***/ "./src/js/view.js":
/*!************************!*\
  !*** ./src/js/view.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst view = (() => {\n  //dom display elements\n  const resultCity = document.querySelector('[data-result-city]');\n  const resultTemperature = document.querySelector('[data-result-temperature]');\n  const resultFeelTemp = document.querySelector(\n    '[data-result-feel-temperature]'\n  );\n  const resultHumidity = document.querySelector('[data-result-humidity]');\n  const resultWind = document.querySelector('[data-result-wind]');\n  const resultDesc = document.querySelector('[data-result-description]');\n  const resultDate = document.querySelector('[data-result-date]');\n  const resultIcon = document.querySelector('[data-result-icon]');\n  const resultGIF = document.querySelector('[data-result-gif]');\n  const loading = document.getElementById('loading');\n  const message = document.querySelector('[data-message]');\n  const messageText = document.querySelector('[data-message-text]');\n  function displayData(newData, tempScale, GIFsrc) {\n    //tempScale: f(farheineit) c(celcius) k(kelvin)\n    if (!newData) return;\n\n    resultCity.textContent = newData.location;\n    resultDesc.textContent = newData.desc;\n    resultDate.textContent = newData.date;\n    resultWind.textContent = newData.wind;\n    resultTemperature.textContent = newData.temperature[tempScale];\n    resultFeelTemp.textContent = newData.feelLikeTemp[tempScale];\n    resultHumidity.textContent = newData.humidity;\n    resultIcon.src = `http://openweathermap.org/img/wn/${newData.icon}@2x.png`;\n    resultGIF.style.backgroundImage = `url(${GIFsrc})`;\n  }\n  function displayError(error) {\n    if (error === null) {\n      view.message.style.display = 'none';\n    } else {\n      console.log('display error', error);\n      view.message.style.display = 'block';\n      console.log('view.message', view.message);\n      view.messageText.textContent = error;\n    }\n  }\n  return { displayData, displayError, loading, message, messageText };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (view);\n\n\n//# sourceURL=webpack://bulma-webpack/./src/js/view.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;