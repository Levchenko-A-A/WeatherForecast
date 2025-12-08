export function createCurrentWeatherSection() {
    const currentWeather = document.createElement('div');
    currentWeather.className = 'current-weather';
    currentWeather.style = 'display: none';

    const location = document.createElement('div');
    location.className = 'location';

    const cityName = document.createElement('h2');
    cityName.className = 'city-name';

    const currentDate = document.createElement('div');
    currentDate.className = 'date';

    location.append(cityName, currentDate);

    const weatherMain = document.createElement('div');
    weatherMain.className = 'wiather-main';
    const weatherInfo = document.createElement('div');
    const temperature = document.createElement('div');
    temperature.className = 'temperature';
    const description = document.createElement('div');
    description.className = 'description';

    weatherInfo.append(temperature, description);
    weatherMain.append(weatherInfo);

    const weatherDetails = document.createElement('div');
    weatherDetails.className = 'weather-details';
    const details = [
        {label: 'Влажность', className: 'humidity'},
        {label: 'Ветер', className: 'wind-speed'},
        {label: 'Давление', className: 'pressure'},
        {label: 'Восход/Закат', className: 'sun-times'}
    ];
    details.forEach(detail => {
        const detailElement = document.createElement('div');
        detailElement.className = 'detail';
        const textContainer = document.createElement('div');
        const label = document.createElement('div');
        label.textContent = detail.label;
        const value = document.createElement('div');
        value.className = detail.className;

        textContainer.append(label, value);
        detailElement.append(textContainer);
        weatherDetails.append(detailElement);
    });
    
    currentWeather.append(location, weatherMain, weatherDetails);
    return currentWeather;
}