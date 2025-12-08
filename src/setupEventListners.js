export function setupEventListners() {
    const searchButton = document.querySelector('.search-btn');
    const cityInput = document.querySelector('.city-input');
    const loadingElement = document.querySelector('.loading');
    const currentWeather = document.querySelector('.current-weather');

    function featchDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    const handleSearch = async () => {
        const city = cityInput.value.trim();
        if(!city || city.toLowerCase() !== 'москва') {
            alert('Введите название города');
            return;
        }

        showLoading(loadingElement, currentWeather);
        await featchDelay(5000);
        updateWeather(city);
        showWeather(loadingElement, currentWeather);
    };

    searchButton.addEventListener('click', handleSearch);
    cityInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });

    function showLoading(loadingElement, currentWeather) {
        loadingElement.style.display = 'block';
        loadingElement.textContent = 'Загрузка данных о погоде...';
        currentWeather.style.display = 'none';
        const searchButton = document.querySelector('.search-btn');
        searchButton.disabled = true;
        searchButton.textContent = 'Загрузка...';
    };

    function showWeather(loadingElement, currentWeather) {
        loadingElement.style.display = 'none';
        currentWeather.style.display = 'block';
        const searchButton = document.querySelector('.search-btn');
        searchButton.disabled = false;
        searchButton.textContent = 'Поиск';
        const cityInput = document.querySelector('.city-input');
        cityInput.value = '';
    };

    function updateWeather(city) {
        const cityName = document.querySelector('.city-name');
        const currentDate = document.querySelector('.date');
        const temperature = document.querySelector('.temperature');
        const description = document.querySelector('.description');
        const humidity = document.querySelector('.humidity');
        const windSpeed = document.querySelector('.wind-speed');
        const pressure = document.querySelector('.pressure');
        const sunTimes = document.querySelector('.sun-times');
        cityName.textContent = city;
        const now = new Date();
        const option = {weekday: 'long', day: 'numeric', month: 'long'};
        currentDate.textContent = now.toLocaleDateString('ru-RU', option);
        temperature.textContent = '-2°C';
        description.textContent = 'Небольшой снег';
        humidity.textContent = '85%';
        windSpeed.textContent = '3 м/с';
        pressure.textContent = '1013 hPa';
        sunTimes.textContent = '6:30 / 20:20';
    }
}