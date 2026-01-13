import { StorageService } from "./StorageService";

describe("StorageService", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });
  test("должен сохранять и извлекать название города", () => {
    StorageService.saveCity("Омск");
    expect(StorageService.getLastCity()).toBe("Омск");
    expect(localStorage.getItem(StorageService.KEY)).toBe("Омск");
  });
  test("должен возвращать null, если хранилище пустое", () => {
    expect(StorageService.getLastCity()).toBeNull();
  });
});
