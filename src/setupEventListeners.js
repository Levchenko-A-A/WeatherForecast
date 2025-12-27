const API_CONFIG = {
  API_KEY: "5e827e71fad6d9e9585023293efff114",
  BASE_URL: "https://api.openweathermap.org/data/2.5/weather",
  GEOCODING_URL: "https://api.openweathermap.org/geo/1.0/reverse",
};
export function setupEventListners(elements) {
  const {
    cityInput,
    searchButton,
    locationButton,
    loadingElement,
    currentWeather,
  } = elements;

  let isLoading = false;

  async function featchRealWeather(city) {
    try {
      const url = `${API_CONFIG.BASE_URL}?q=${encodeURIComponent(city)}&units=metric&lang=ru&appid=${API_CONFIG.API_KEY}`;
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Город не найден");
        } else {
          throw new Error("Ошибка при получении данных о погоде");
        }
      }
      const data = await response.json();
      return processWeatherData(data);
    } catch (error) {
      console.error("Ошибка", error);
      throw error;
    }
  }

  function processWeatherData(data) {
    return {
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      pressure: data.main.pressure,
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      cityName: data.name,
      country: data.sys.country,
    };
  }

  async function getLocationWeather() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation не поддерживается вашим браузером"));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const city = await getCytiByCoords(
              position.coords.latitude,
              position.coords.longitude,
            );
            const weatherData = await featchRealWeather(city);
            resolve({ city, weatherData });
          } catch (error) {
            reject(error);
          }
        },
        (error) => {
          let errorMessage = "Не удалось определить местоположение";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage =
                "Пользователь отклонил запрос на определение местоположения";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Информация о местоположении недоступна";
              break;
            case error.TIMEOUT:
              errorMessage =
                "Время ожидания определения местополодения истекло";
              break;
          }
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      );
    });
  }

  async function getCytiByCoords(lat, lon) {
    try {
      const url = `${API_CONFIG.GEOCODING_URL}?lat=${lat}&lon=${lon}&limit=1&appid=${API_CONFIG.API_KEY}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Ошибка при получении данных о погоде");
      }
      const data = await response.json();
      if (data.length === 0) {
        throw new Error("Город не найден по данным координатам");
      }
      return data[0].name;
    } catch (error) {
      console.error("Ошибка геокодинга:", error);
      throw new Error("Не удалось определить город по местополжению");
    }
  }

  async function handLocationSearch() {
    if (isLoading) return;
    try {
      showLoading();
      const result = await getLocationWeather();
      cityInput.value = result.city;
      updateWeather(result.city, result.weatherData);
      showWeather();
    } catch (error) {
      showWeather();
      alert(`Ошибка: ${error.message}`);
      console.error("Ошибка определения местоположения:", error);
    }
  }

  const handleSearch = async () => {
    const city = cityInput.value.trim();
    if (!city) {
      cityInput.value = "";
      currentWeather.style.display = "none";
      alert("Введите название города");
      return;
    }

    showLoading();
    try {
      const weatherData = await featchRealWeather(city);
      updateWeather(city, weatherData);
      showWeather(loadingElement, currentWeather);
    } catch (error) {
      showWeather();
      alert(`Ошибка поиска: ${error.message}`);
      console.error("Ошибка поиска:", error);
    }
  };

  function showLoading() {
    isLoading = true;
    loadingElement.style.display = "block";
    loadingElement.textContent = "Загрузка данных о погоде...";
    currentWeather.style.display = "none";

    searchButton.disabled = true;
    searchButton.textContent = "Загрузка...";
    locationButton.disabled = true;
  }

  function showWeather() {
    isLoading = false;
    loadingElement.style.display = "none";
    currentWeather.style.display = "block";

    searchButton.disabled = false;
    searchButton.textContent = "Поиск";
    locationButton.disabled = false;
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

  searchButton.addEventListener("click", handleSearch);
  locationButton.addEventListener("click", handLocationSearch);
  cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  });
  setTimeout(() => {
    if (cityInput) {
      cityInput.focus();
    }
  }, 100);
}
