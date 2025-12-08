import { createCurrentWeatherSection } from "./createCurrentWeatherSection"

export function createMainSection (el) {
    const appContainer = document.createElement('div');
    appContainer.className = 'container';
    const header = document.createElement('header');
    const title = document.createElement('h1');
    title.textContent = 'Прогноз погоды';
    const searchConteiner = document.createElement('div');
    searchConteiner.className = 'search-container';

    const cityInput = document.createElement('input');
    cityInput.type = 'text';
    cityInput.className = 'city-input';
    cityInput.placeholder = 'Введите название города... (например Москва)';
    
    const searchButton = document.createElement('button');
    searchButton.className = 'search-btn';
    searchButton.textContent = 'Поиск';

    searchConteiner.append(cityInput, searchButton);
    header.append(title, searchConteiner);

    const main = document.createElement('main');
    const weatherContainer = document.createElement('div');
    weatherContainer.className = 'weather-container';
    const loadingElement = document.createElement('div');
    loadingElement.className = 'loading';
    // loadingElement.textContent = 'Загрузка данных о погоде...';

    const currentWeather = createCurrentWeatherSection();

    weatherContainer.append(loadingElement, currentWeather);
    main.append(weatherContainer);
    appContainer.append(header, main);
    el.append(appContainer);
}