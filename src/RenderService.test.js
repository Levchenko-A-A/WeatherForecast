import { RenderService } from "./RenderService";

describe("RenderService", () => {
  let elements;
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="loading"></div>
      <div class="current-weather" style="display: none">
        <div class="city-name"></div>
        <div class="temperature"></div>
        <div class="description"></div>
        <div class="humidity"></div>
        <div class="wind-speed"></div>
        <div class="pressure"></div>
        <div class="sun-times"></div>
        <div class="date"></div>
      </div>
    `;
    elements = {
      loadingElement: document.querySelector(".loading"),
      currentWeather: document.querySelector(".current-weather"),
    };
  });
  test("toggleLoading: отображение текста загрузки", () => {
    const ui = new RenderService(elements);
    ui.toggleLoading(true);
    expect(elements.loadingElement.textContent).toBe("Загрузка...");
    ui.toggleLoading(false);
    expect(elements.loadingElement.textContent).toBe("");
  });
  test("renderWeather: полное заполнение полей", () => {
    const ui = new RenderService(elements);
    const data = {
      cityName: "Москва",
      temperature: 20,
      description: "ясно",
      humidity: 50,
      windSpeed: 3,
      pressure: 1010,
      sunrise: "06:00",
      sunset: "21:00",
    };
    ui.renderWeather(data);
    expect(elements.currentWeather.style.display).toBe("block");
    expect(
      elements.currentWeather.querySelector(".city-name").textContent,
    ).toBe("Москва");
    expect(
      elements.currentWeather.querySelector(".temperature").textContent,
    ).toContain("20°C");
    expect(
      elements.currentWeather.querySelector(".sun-times").textContent,
    ).toBe("06:00 / 21:00");
  });
  test("должен выбрасывать ошибку, если элементы не переданы", () => {
    expect(() => new RenderService(null)).toThrow("Требуемые элементы");
  });
});
