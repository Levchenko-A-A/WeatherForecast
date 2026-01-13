export class RenderService {
  constructor(elements) {
    if (!elements) throw new Error("Требуемые элементы");
    this.elements = elements;
  }
  renderWeather(data) {
    const { currentWeather } = this.elements;
    currentWeather.style.display = "block";
    this._setText(".city-name", data.cityName);
    this._setText(".temperature", `${data.temperature}°C`);
    this._setText(".description", data.description);
    this._setText(".humidity", `${data.humidity}%`);
    this._setText(".wind-speed", `${data.windSpeed} м/с`);
    this._setText(".pressure", `${data.pressure} hPa`);
    this._setText(".sun-times", `${data.sunrise} / ${data.sunset}`);
    this._setText(
      ".date",
      new Date().toLocaleDateString("ru-RU", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }),
    );
  }
  toggleLoading(isLoading) {
    this.elements.loadingElement.textContent = isLoading ? "Загрузка..." : "";
  }
  _setText(selector, text) {
    const el = this.elements.currentWeather.querySelector(selector);
    if (el) el.textContent = text;
  }
}
