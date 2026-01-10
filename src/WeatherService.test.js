import { WeatherService } from "./WeatherService";

describe("WeatherService", () => {
  const API_KEY = "test_key";
  const service = new WeatherService(API_KEY);
  beforeEach(() => {
    global.fetch = jest.fn();
  });
  test("fetchWeather", async () => {
    const mockApiData = {
      main: { temp: 10.5, humidity: 70, pressure: 1000 },
      weather: [{ description: "дождь" }],
      wind: { speed: 5 },
      sys: { sunrise: 1704864000, sunset: 1704900000 },
      name: "Лондон",
    };
    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockApiData,
    });
    const result = await service.fetchWeather("Лондон");
    expect(result.temperature).toBe(11);
    expect(result.cityName).toBe("Лондон");
    expect(result.description).toBe("дождь");
  });
  test("fetchWeather: ошибка 404 (город не найден)", async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 404 });
    await expect(service.fetchWeather("Unknown")).rejects.toThrow(
      "Город не найден",
    );
  });
  test("fetchWeather: общая ошибка сервера", async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 500 });
    await expect(service.fetchWeather("Moscow")).rejects.toThrow("Ошибка API");
  });
});
