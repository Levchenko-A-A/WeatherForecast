export function setupEventListners() {
  const searchButton = document.querySelector(".search-btn");
  const cityInput = document.querySelector(".city-input");
  const loadingElement = document.querySelector(".loading");
  const currentWeather = document.querySelector(".current-weather");

  function featchDelay() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockWeatherData = {
          temperature: -2,
          description: "Небольшой снег",
          humidity: 85,
          windSpeed: 3,
          pressure: 1013,
          sunrise: "08:45",
          sunset: "16:20",
        };
        resolve(mockWeatherData);
      }, 5000);
    });
  }

  const handleSearch = async () => {
    const city = cityInput.value.trim();
    if (!city || city.toLowerCase() !== "москва") {
      cityInput.value = "";
      currentWeather.style.display = "none";
      alert("Введите название города");
      return;
    }

    showLoading(loadingElement, currentWeather);
    const weatherData = await featchDelay();
    updateWeather(city, weatherData);
    showWeather(loadingElement, currentWeather);
  };

  searchButton.addEventListener("click", handleSearch);
  cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  });

  function showLoading(loadingElement, currentWeather) {
    loadingElement.style.display = "block";
    loadingElement.textContent = "Загрузка данных о погоде...";
    currentWeather.style.display = "none";
    const searchButton = document.querySelector(".search-btn");
    searchButton.disabled = true;
    searchButton.textContent = "Загрузка...";
  }

  function showWeather(loadingElement, currentWeather) {
    loadingElement.style.display = "none";
    currentWeather.style.display = "block";
    const searchButton = document.querySelector(".search-btn");
    searchButton.disabled = false;
    searchButton.textContent = "Поиск";
    const cityInput = document.querySelector(".city-input");
    cityInput.value = "";
  }

  function updateWeather(city, weatherData) {
    const cityName = document.querySelector(".city-name");
    const currentDate = document.querySelector(".date");
    const temperature = document.querySelector(".temperature");
    const description = document.querySelector(".description");
    const humidity = document.querySelector(".humidity");
    const windSpeed = document.querySelector(".wind-speed");
    const pressure = document.querySelector(".pressure");
    const sunTimes = document.querySelector(".sun-times");
    cityName.textContent = city;
    const now = new Date();
    const option = { weekday: "long", day: "numeric", month: "long" };
    currentDate.textContent = now.toLocaleDateString("ru-RU", option);
    temperature.textContent = `${weatherData.temperature}°C`;
    description.textContent = weatherData.description;
    humidity.textContent = `${weatherData.humidity}%`;
    windSpeed.textContent = `${weatherData.windSpeed}м/с`;
    pressure.textContent = `${weatherData.pressure}hPa`;
    sunTimes.textContent = `${weatherData.sunrise} / ${weatherData.sunset}`;
  }
}
