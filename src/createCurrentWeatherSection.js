export function createCurrentWeatherSection() {
    const currentWeather = document.createElement('div');
    currentWeather.className = 'current-weather';
    currentWeather.style = 'display: none';

    const location = document.createElement('div');
    location.className = 'location';

    const cityName = document.createElement('h2');
    cityName.textContent = 'Москва';
    cityName.id = 'city-name';
    cityName.cityName = 'city-name';

    const currentDate = document.createElement('div');
    currentDate.className = 'date';
    currentDate.id = 'current-date';

    location.append(cityName, currentDate);

    const weatherMain = document.createElement('div');
    weatherMain.className = 'wiather-main';
    const weatherInfo = document.createElement('div');
    const temperature = document.createElement('div');
    temperature.textContent = '25°C';
    temperature.className = 'temperature';
    temperature.id = 'temperature';
    const description = document.createElement('div');
    description.textContent = 'Солнечно';
    description.className = 'description';
    description.id = 'description';

    weatherInfo.append(temperature, description);
    weatherMain.append(weatherInfo);

    const weatherDetails = document.createElement('div');
    weatherDetails.className = 'weather-details';
    const details = [
        {label: 'Влажность', value: '65%', id: 'humidity'},
        {label: 'Ветер', value: '5 м/с', id: 'wind-speed'},
        {label: 'Давление', value: '1013 hPa', id: 'pressure'},
        {label: 'Восход/Закат', value: '05:30 / 21:15', id: 'sun-times'}
    ];
    details.forEach(detail => {
        const detailElement = document.createElement('div');
        detailElement.className = 'detail';
        const textContainer = document.createElement('div');
        const label = document.createElement('div');
        label.textContent = detail.label;
        const value = document.createElement('div');
        value.textContent = detail.value;
        value.id = detail.id;

        textContainer.append(label, value);
        detailElement.append(textContainer);
        weatherDetails.append(detailElement);
    });
    
    currentWeather.append(location, weatherMain, weatherDetails);
    return currentWeather;
}