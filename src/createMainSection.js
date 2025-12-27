import { createCurrentWeatherSection } from "./createCurrentWeatherSection";

export function createMainSection(el) {
  const appContainer = document.createElement("div");
  appContainer.className = "container";
  const header = document.createElement("header");
  const title = document.createElement("h1");
  title.textContent = "Прогноз погоды";
  const searchConteiner = document.createElement("div");
  searchConteiner.className = "search-container";

  const cityInput = document.createElement("input");
  cityInput.type = "text";
  cityInput.className = "city-input";
  cityInput.placeholder = "Введите название города... (например Москва)";
  const locationButton = document.createElement("button");
  locationButton.className = "location-btn";
  locationButton.type = "button";
  locationButton.title = "Определить местоположение";
  locationButton.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 
      8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 
      0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-
      7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
    </svg>
  `;

  const searchButton = document.createElement("button");
  searchButton.className = "search-btn";
  searchButton.textContent = "Поиск";

  searchConteiner.append(cityInput, locationButton, searchButton);
  header.append(title, searchConteiner);

  const main = document.createElement("main");
  const weatherContainer = document.createElement("div");
  weatherContainer.className = "weather-container";
  const loadingElement = document.createElement("div");
  loadingElement.className = "loading";

  const currentWeather = createCurrentWeatherSection();

  weatherContainer.append(loadingElement, currentWeather);
  main.append(weatherContainer);
  appContainer.append(header, main);
  el.append(appContainer);

  return {
    cityInput,
    searchButton,
    locationButton,
    loadingElement,
    currentWeather,
  };
}
