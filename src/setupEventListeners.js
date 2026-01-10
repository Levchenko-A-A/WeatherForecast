import { WeatherService } from "./WeatherService";
import { LocationService } from "./LocationService";
import { StorageService } from "./StorageService";
import { RenderService } from "./RenderService";

const API_KEY = "5e827e71fad6d9e9585023293efff114";

export function setupEventListners(elements) {
  const { cityInput, searchButton, locationButton } = elements;
  const weatherService = new WeatherService(API_KEY);
  const locationService = new LocationService(API_KEY);
  const ui = new RenderService(elements);
  const handleSearch = async (city) => {
    const cityName = city?.trim();
    if (!cityName) return;
    try {
      ui.toggleLoading(true);
      const data = await weatherService.fetchWeather(cityName);
      ui.renderWeather(data);
      StorageService.saveCity(cityName);
      cityInput.value = "";
    } catch (error) {
      alert(error.message);
    } finally {
      ui.toggleLoading(false);
    }
  };
  const handleLocation = async () => {
    try {
      ui.toggleLoading(true);
      const pos = await locationService.getCurrentPosition();
      const city = await locationService.getCityByCoords(
        pos.coords.latitude,
        pos.coords.longitude,
      );
      await handleSearch(city);
    } catch (error) {
      console.error(error);
      alert("Не удалось определить местоположение");
    } finally {
      ui.toggleLoading(false);
    }
  };
  searchButton.addEventListener("click", () => handleSearch(cityInput.value));
  cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSearch(cityInput.value);
  });
  locationButton.addEventListener("click", handleLocation);
  const lastCity = StorageService.getLastCity();
  if (lastCity) handleSearch(lastCity);
}
