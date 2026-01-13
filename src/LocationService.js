export class LocationService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.geoUrl = "https://api.openweathermap.org/geo/1.0/reverse";
  }
  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        return reject(new Error("Геолокация не поддерживается"));
      }
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
      });
    });
  }
  async getCityByCoords(lat, lon) {
    const url = `${this.geoUrl}?lat=${lat}&lon=${lon}&limit=1&lang=ru&appid=${this.apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data[0]?.name || "Москва";
  }
}
