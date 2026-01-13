export class WeatherService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://api.openweathermap.org/data/2.5/weather";
  }
  async fetchWeather(city) {
    const url = `${this.baseUrl}?q=${encodeURIComponent(city)}&units=metric&lang=ru&appid=${this.apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        response.status === 404 ? "Город не найден" : "Ошибка API",
      );
    }
    const data = await response.json();
    return this.processWeatherData(data);
  }
  processWeatherData(data) {
    return {
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      pressure: data.main.pressure,
      sunrise: this.formatTime(data.sys.sunrise),
      sunset: this.formatTime(data.sys.sunset),
      cityName: data.name,
    };
  }
  formatTime(timestamp) {
    return new Date(timestamp * 1000).toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}
