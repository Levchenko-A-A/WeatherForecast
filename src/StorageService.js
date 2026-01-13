export class StorageService {
  static KEY = "last_weather_city";
  static saveCity(city) {
    localStorage.setItem(this.KEY, city);
  }
  static getLastCity() {
    return localStorage.getItem(this.KEY);
  }
}
