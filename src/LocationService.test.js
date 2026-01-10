import { LocationService } from "./LocationService";

describe("LocationService", () => {
  const API_KEY = "test-key";
  let service;
  beforeEach(() => {
    service = new LocationService(API_KEY);
    jest.clearAllMocks();
    global.fetch = jest.fn();
    global.navigator.geolocation = {
      getCurrentPosition: jest.fn(),
    };
  });
  describe("getCurrentPosition", () => {
    test("должен возвращать координаты при успешном получении позиции", async () => {
      const mockPosition = {
        coords: { latitude: 54.7, longitude: 20.5 },
      };
      navigator.geolocation.getCurrentPosition.mockImplementationOnce(
        (success) => success(mockPosition),
      );
      const pos = await service.getCurrentPosition();
      expect(pos.coords.latitude).toBe(54.7);
      expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
    });
    test("должен выбрасывать ошибку, если пользователь отклонил запрос", async () => {
      const mockError = new Error("User denied Geolocation");
      navigator.geolocation.getCurrentPosition.mockImplementationOnce(
        (success, reject) => reject(mockError),
      );
      await expect(service.getCurrentPosition()).rejects.toThrow(
        "User denied Geolocation",
      );
    });
    test("должен выбрасывать ошибку, если геолокация не поддерживается", async () => {
      delete global.navigator.geolocation;
      await expect(service.getCurrentPosition()).rejects.toThrow(
        "Геолокация не поддерживается",
      );
      global.navigator.geolocation = { getCurrentPosition: jest.fn() };
    });
  });
  describe("getCityByCoords", () => {
    test("должен возвращать название города из API", async () => {
      const mockResponse = [{ name: "Лондон" }];
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });
      const city = await service.getCityByCoords(51.5, -0.1);
      expect(city).toBe("Лондон");
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("lat=51.5&lon=-0.1&limit=1&lang=ru"),
      );
    });
    test("должен возвращать 'Москва', если API вернул пустой массив", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });
      const city = await service.getCityByCoords(0, 0);
      expect(city).toBe("Москва");
    });
  });
});
